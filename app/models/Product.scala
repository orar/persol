package models

import java.util.UUID
import java.time.Instant
import play.api.libs.json._


case class Product (
                   id: UUID,
                   name: String,
                   price: Double,
                   productCode: String,
                   description: String,
                   date: Instant
                   )


object Product {
  implicit val productFormat: Format[Product] = Json.format

  val sample = Product(
    id = UUID.randomUUID(),
    name = "Summer umbrella",
    price = 4453,
    productCode = "sm342",
    description = "summer umbreller for a good weather shade at a beach",
    date = Instant.now
  )
}