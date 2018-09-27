package util.json


import play.api.libs.json._
import play.api.data.FormError


object JsonFormats {

  implicit val formErrorWrites: OWrites[FormError] = OWrites[FormError]{ e =>
    Json.obj(
      "key" -> e.key,
      "message" -> e.message
    )
  }

}