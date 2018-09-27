package modules

import com.google.inject.{AbstractModule, Provides, Singleton}
import models.{ProductDAO, ProductDAOImpl}
import slick.jdbc.H2Profile
import slick.jdbc.H2Profile.api._
import tables.{Bootstrap, SchemaBootstrap}


class AppModule extends AbstractModule {


  def configure(): Unit = {
    bind(classOf[Bootstrap]).to(classOf[SchemaBootstrap]).asEagerSingleton()
    bind(classOf[ProductDAO]).to(classOf[ProductDAOImpl])
  }



  @Singleton
  @Provides
  def providesH2DB(): H2Profile.backend.Database = {
    Database.forConfig("h2mem1")
  }
}