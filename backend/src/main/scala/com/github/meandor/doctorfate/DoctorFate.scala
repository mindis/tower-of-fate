package com.github.meandor.doctorfate

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import com.github.meandor.doctorfate.auth.AuthModule
import com.github.meandor.doctorfate.core.{DatabaseModule, WebServer}
import com.typesafe.config.{Config, ConfigFactory}
import com.typesafe.scalalogging.LazyLogging

import scala.concurrent.ExecutionContextExecutor

object DoctorFate extends LazyLogging {
  def main(args: Array[String]): Unit = {
    logger.info("Starting System")
    implicit val system: ActorSystem[Nothing]               = ActorSystem(Behaviors.empty, "doctorFate")
    implicit val executionContext: ExecutionContextExecutor = system.executionContext

    logger.info("Start loading config")
    val config: Config = ConfigFactory.load
    logger.info("Done loading config")
    val databaseModule = DatabaseModule(config)
    databaseModule.start()
    val authModule      = AuthModule(config, databaseModule)
    val tokenController = authModule.start
    WebServer(config, tokenController).start
  }
}
