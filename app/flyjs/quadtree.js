export class QuadTree {
  constructor(x, y, width, height, capacity = 4) {
    this.boundary = { x, y, width, height };
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const { x, y, width, height } = this.boundary;
    const w = width / 2;
    const h = height / 2;

    this.northwest = new QuadTree(x, y, w, h, this.capacity);
    this.northeast = new QuadTree(x + w, y, w, h, this.capacity);
    this.southwest = new QuadTree(x, y + h, w, h, this.capacity);
    this.southeast = new QuadTree(x + w, y + h, w, h, this.capacity);

    this.divided = true;
  }

  insert(point) {
    if (!this.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (
      this.northwest.insert(point) ||
      this.northeast.insert(point) ||
      this.southwest.insert(point) ||
      this.southeast.insert(point)
    );
  }

  query(range, found = []) {
    if (!this.intersects(range)) {
      return found;
    }

    for (const point of this.points) {
      if (this.containsPoint(range, point)) {
        found.push(point);
      }
    }

    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }

    return found;
  }

  clear() {
    this.points = [];
    this.divided = false;
    this.northwest = null;
    this.northeast = null;
    this.southwest = null;
    this.southeast = null;
  }

  contains(point) {
    return (
      point.position.x >= this.boundary.x &&
      point.position.x < this.boundary.x + this.boundary.width &&
      point.position.y >= this.boundary.y &&
      point.position.y < this.boundary.y + this.boundary.height
    );
  }

  intersects(range) {
    return !(
      range.x > this.boundary.x + this.boundary.width ||
      range.x + range.width < this.boundary.x ||
      range.y > this.boundary.y + this.boundary.height ||
      range.y + range.height < this.boundary.y
    );
  }

  containsPoint(range, point) {
    return (
      point.position.x >= range.x &&
      point.position.x < range.x + range.width &&
      point.position.y >= range.y &&
      point.position.y < range.y + range.height
    );
  }
}
