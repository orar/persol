package models

import java.util.UUID

import scala.collection.mutable.ArrayBuffer


object ProductDB {

  val products = ArrayBuffer[Product](Product.sample)

  def add(product: Product) = {
    products.append(product)
  }

  def remove(id: UUID) = {
    val index = products.indexWhere(_.id == id)
    products.remove(index)
  }


  def update(product: Product): Unit = {
    remove(product.id)
    add(product)
  }
}