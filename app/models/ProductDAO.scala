package models

import com.google.inject.Inject
import java.util.UUID

import play.api.libs.json.JsObject
import slick.jdbc.H2Profile
import slick.jdbc.H2Profile.api._

import scala.concurrent.{ExecutionContext, Future}
import tables.Products

trait ProductDAO {

  def find(id: UUID): Future[Option[Product]]

  def all: Future[Seq[Product]]

  def save(p: Product): Future[Unit]

  def update(p: Product): Future[Unit]

  def remove(id: UUID): Future[Unit]
}


class ProductDAOImpl @Inject()(db: H2Profile.backend.Database)(implicit ec: ExecutionContext) extends ProductDAO {

  override def find(id: UUID): Future[Option[Product]] = {
    val query = Products.products.filter(_.id === id)
    db.run(query.result).map(_.headOption)
  }

  override def all: Future[Seq[Product]] = {
    db.run(Products.products.result)
  }

  override def save(p: Product): Future[Unit] = {
    val action = Products.products += p

    db.run(action).map(_=> Unit)
  }

  override def update(p: Product): Future[Unit] = {
    val query = for { t <- Products.products if t.id === p.id } yield t
    val action = query.update(p)
    db.run(action).map(_=> Unit)
  }

  override def remove(id: UUID): Future[Unit] = {
    val query = Products.products.filter(_.id === id)
    val action = query.delete
    db.run(action).map(_=> Unit)
  }
}

