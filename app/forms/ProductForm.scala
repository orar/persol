package forms

import java.util.UUID
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._

object ProductForm {

  val form = Form(mapping(
    "id" -> optional(uuid),
    "name" -> nonEmptyText,
    "price" -> of[Double],
    "productCode" -> nonEmptyText,
    "description" -> nonEmptyText
  )(Data.apply)(Data.unapply))


  case class Data(
                   id: Option[UUID],
                   name: String,
                   price: Double,
                   productCode: String,
                   description: String
                 )
}