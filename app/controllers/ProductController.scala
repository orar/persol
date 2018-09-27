package controllers

import java.util.UUID
import util.json.JsonFormats._
import play.api._
import play.api.mvc._
import play.api.libs.json._
import models.{ ProductDAO, Product }
import javax.inject._
import forms.ProductForm
import java.time.Instant
import scala.concurrent.{ExecutionContext, Future}

/**
  * Product CRUD controller
  * @param controllerComponents Play controller components
  * @param productDAO Product DAO
  * @param ec Execution context
  */
class ProductController @Inject()(val controllerComponents: ControllerComponents, productDAO: ProductDAO)
                                 (implicit ec: ExecutionContext) extends ApiController {


  /**
    * Fetches all products from store
    * @return
    */
  def products: Action[AnyContent] = Action.async {
    productDAO.all.map(p => Ok(Json.toJson(p)))
  }

  /**
    * Adds a single product to store
    * @return
    */
  def addProduct:  Action[AnyContent] = Action.async { implicit req =>
    ProductForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(ApiResponse("form.error", "form.error", form.errors))),
      data => {
        val product = Product(
          id = UUID.randomUUID(),
          name = data.name,
          price = data.price,
          productCode = data.productCode,
          description = data.description,
          date = Instant.now
        )
        productDAO.save(product).map(_=> Ok(ApiResponse("ok", "ok", Seq(product))))
      }
    )
  }


  /**
    * Updates a single product by its id
    * @return
    */
  def updateProduct: Action[AnyContent] = Action.async { implicit req =>
    ProductForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(ApiResponse("form.error", "form.error", form.errors))),
      data => {
        data.id match {
          case Some(id) =>
            productDAO.find(id).flatMap {
              case Some (p) =>
                val product = p.copy (
                  name = data.name,
                  price = data.price,
                  productCode = data.productCode,
                  description = data.description
                )
                productDAO.update (product).map (_ => Ok (ApiResponse("ok", "ok", product)) )

              case _ => Future.successful(BadRequest(ApiResponse("ok", "id not found") ))
            }
          case _ => Future.successful(BadRequest(ApiResponse("ok", "id not found") ))
        }
      }
    )
  }


  /**
    * Removes a product by its id
    * @param id
    * @return
    */
  def remove(id: UUID):  Action[AnyContent] = Action.async {
    productDAO.remove(id).map(_=> Ok(ApiResponse("ok", "ok")))
  }



}