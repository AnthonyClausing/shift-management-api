import express from "express";
import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes";
import { UserRoutes } from "../routes/user_routes";

class App {

  public app: express.Application;
  private test_routes: TestRoutes = new TestRoutes();
  private common_routes: TestRoutes = new CommonRoutes();
  private user_routes: UserRoutes = new UserRoutes();
  
  constructor() {
     this.app = express(); 
    this.test_routes.route(this.app);
     this.user_routes.route(this.app);
     this.common_routes.route(this.app);
  }
}
export default new App().app;