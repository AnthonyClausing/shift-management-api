enum Environments {
  local_environment = 'local',
  dev_environment = 'development',
  prod_environment = 'production',
  test_environment = 'testing'
}

class Environment {
  private environment: String;

  constructor(environment: String) {
      this.environment = environment;
  }

  getPort(): Number {
      if (this.environment === Environments.prod_environment) {
          return 8081;
      } else if (this.environment === Environments.dev_environment) {
          return 8082;
      } else if (this.environment === Environments.test_environment) {
          return 8083;
      } else {
          return 3000;
      }
  }

  getDBName(): String {
      if (this.environment === Environments.prod_environment) {
          return 'production';
      } else if (this.environment === Environments.dev_environment) {
          return 'development';
      } else if (this.environment === Environments.test_environment) {
          return 'testing';
      } else {
          return 'db_test_project_local';
      }
  }
}

export default new Environment(Environments.dev_environment);