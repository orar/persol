package tables


import javax.inject.Inject
import slick.jdbc.H2Profile
import slick.jdbc.H2Profile.api._

import scala.concurrent.Future


trait Bootstrap {

}

class SchemaBootstrap @Inject()(db: H2Profile.backend.Database) extends Bootstrap {

  val schemas = {
    DBIO.seq(Products.products.schema.create)

  }

  //Create schemas
  db.run(schemas)

}
