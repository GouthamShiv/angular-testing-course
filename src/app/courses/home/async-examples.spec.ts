import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples", () => {
  it("Async test example with Jasmine done()", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log("Running assertions");
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Async test example with setTimeout()", fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      console.log("Running assertions setTimeout()");
      test = true;
      // expect(test).toBeTruthy();
    }, 1000);
    tick(1000);
    expect(test).toBeTruthy();
  }));

  it("Async test example with multiple setTimeout()", fakeAsync(() => {
    let test = false;
    setTimeout(() => {});
    setTimeout(() => {
      console.log("Running assertions for multiple setTimeout()");
      test = true;
      // expect(test).toBeTruthy();
    }, 1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {
    let test = false;
    console.log("Creating promise");

    Promise.resolve()
      .then(() => {
        console.log("1st Promise evaluated successfully");
        return Promise.resolve();
      })
      .then(() => {
        console.log("2nd Promise evaluated successfully");
        test = true;
      })
      .catch(() => {
        console.error("Some error");
      });
    flushMicrotasks();
    console.log("Running test assertions");
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - Promises + setTimeout()", fakeAsync(() => {
    let counter = 0;

    Promise.resolve()
      .then(() => {
        counter += 10;
        setTimeout(() => {
          counter += 1;
        }, 1000);
      })
      .catch(() => {
        console.error("Some error");
      });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it("Asynchronous test example - Observables", fakeAsync(() => {
    let test = false;
    console.log("Creating observable");
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log("Running test assertions");
    expect(test).toBe(true);
  }));
});
