package tables

import java.sql.Date
import java.time.Instant
import java.util.UUID

import slick.jdbc.H2Profile.api._
import slick.lifted.Tag
import models.Product
import scala.reflect.ClassTag


class Products(tag: Tag) extends Table[Product](tag, "Suppliers")  {


  implicit val instantType = MappedColumnType.base[Instant, Date](
    i => new Date(i.toEpochMilli),
    _.toInstant
  )

  def id = column[UUID]("PROD_ID", O.PrimaryKey) // This is the primary key column
  def name = column[String]("PROD_NAME")
  def price = column[Double]("PRICE")
  def productCode = column[String]("PROD_CODE")
  def description = column[String]("DESCRIPTION")
  def date = column[Instant]("DATE")



  override def * = (id, name, price, productCode, description, date) <> ((Product.apply _).tupled, Product.unapply)
}


object Products {
  type ProductTuple = (UUID, String)

  val products = TableQuery[Products]


}