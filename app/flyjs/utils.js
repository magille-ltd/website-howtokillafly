export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  multiply(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  magnitude() {
    console.log("magnitude", this.x, this.y)
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    console.log("normalize", this.x, this.y)
    const mag = this.magnitude();
    if (mag === 0) return new Vector2D(0, 0);
    return new Vector2D(this.x / mag, this.y / mag);
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }
}

export class Vector3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(v) {
    return new Vector3D(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v) {
    return new Vector3D(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(scalar) {
    return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  magnitude() {
    console.log("3d magnitude", this.x, this.y, this.z)
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    console.log("3d normalize", this.x, this.y, this.z)
    const mag = this.magnitude();
    if (mag === 0) return new Vector3D(0, 0, 0);
    return new Vector3D(this.x / mag, this.y / mag, this.z / mag);
  }

  clone() {
    return new Vector3D(this.x, this.y, this.z);
  }

  lerp(other, t) {
    return new Vector3D(
      this.x + (other.x - this.x) * t,
      this.y + (other.y - this.y) * t,
      this.z + (other.z - this.z) * t
    );
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }
}

export function randomGaussian(mean, standardDeviation) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * standardDeviation + mean;
}

export function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
