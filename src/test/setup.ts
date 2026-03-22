import "@testing-library/jest-dom";

// jsdom does not implement scrollIntoView — provide a no-op
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// jsdom does not implement IntersectionObserver — provide a minimal stub
class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
