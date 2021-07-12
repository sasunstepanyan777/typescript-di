import { Injectable } from "../src/injectable";
import { Injector } from "../src/injector";

@Injectable()
class Service1 {
  doService1Staff() {
    console.log("Service1");
  }
}

@Injectable()
class Service2 {
  doService2Staff() {
    console.log("Service2");
  }
  constructor(public service1: Service1) {}
}

@Injectable()
class Example {
  constructor(public service1: Service1, public service2: Service2) {}
}

const example = Injector.resolve(Example);
example.service1.doService1Staff();
example.service2.doService2Staff();
