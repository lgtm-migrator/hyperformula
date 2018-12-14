import {SimpleCellAddress} from './Cell'
import {CellVertex, EmptyCellVertex, RangeVertex} from './Vertex'

export interface IAddressMapping {
  getCell(address: SimpleCellAddress): CellVertex,
  setCell(address: SimpleCellAddress, newVertex: CellVertex): void,
  getRange(start: SimpleCellAddress, end: SimpleCellAddress): void,
  setRange(vertex: RangeVertex): void,
  has(address: SimpleCellAddress): boolean,
  getMaximumRow(): number,
  getMaximumCol(): number,
}

export class AddressMapping implements IAddressMapping {
  private mapping: Map<number, Map<number, CellVertex>> = new Map()
  private rangeMapping: Map<string, RangeVertex> = new Map()

  constructor(private maxCol: number = 0, private maxRow: number = 0) { }

  public getCell(address: SimpleCellAddress): CellVertex {
    const colMapping = this.mapping.get(address.col)
    if (!colMapping) {
      return EmptyCellVertex.getSingletonInstance()
    }
    return colMapping.get(address.row) || EmptyCellVertex.getSingletonInstance()
  }

  public setCell(address: SimpleCellAddress, newVertex: CellVertex) {
    let colMapping = this.mapping.get(address.col)
    if (!colMapping) {
      colMapping = new Map()
      this.mapping.set(address.col, colMapping)
    }
    colMapping.set(address.row, newVertex)
  }

  public setRange(vertex: RangeVertex) {
    const key = `${vertex.getStart().col},${vertex.getStart().row},${vertex.getEnd().col},${vertex.getEnd().row}`
    this.rangeMapping.set(key, vertex)
  }

  public getRange(start: SimpleCellAddress, end: SimpleCellAddress): RangeVertex | null {
    const key = `${start.col},${start.row},${end.col},${end.row}`
    return this.rangeMapping.get(key) || null
  }

  public has(address: SimpleCellAddress): boolean {
    const colMapping = this.mapping.get(address.col)
    if (!colMapping) {
      return false
    }
    return !!colMapping.get(address.row)
  }

  public getMaximumRow(): number {
    return this.maxRow
  }

  public getMaximumCol(): number {
    return this.maxCol
  }
}

export class ArrayAddressMapping implements IAddressMapping {
  private mapping: Array<Array<CellVertex>>
  private rangeMapping: Map<string, RangeVertex> = new Map()

  constructor(private maxCol: number, private maxRow: number) {
    this.mapping = new Array(maxRow + 1)
    for (let i = 0; i <= maxRow; i++) {
      this.mapping[i] = new Array(maxCol + 1)
    }
  }

  public getCell(address: SimpleCellAddress): CellVertex {
    return this.mapping[address.row][address.col] || EmptyCellVertex.getSingletonInstance()
  }

  public setCell(address: SimpleCellAddress, newVertex: CellVertex) {
    this.mapping[address.row][address.col] = newVertex
  }

  public setRange(vertex: RangeVertex) {
    const key = `${vertex.getStart().col},${vertex.getStart().row},${vertex.getEnd().col},${vertex.getEnd().row}`
    this.rangeMapping.set(key, vertex)
  }

  public getRange(start: SimpleCellAddress, end: SimpleCellAddress): RangeVertex | null {
    const key = `${start.col},${start.row},${end.col},${end.row}`
    return this.rangeMapping.get(key) || null
  }

  public has(address: SimpleCellAddress): boolean {
    return !!this.mapping[address.row][address.col]
  }

  public getMaximumRow(): number {
    return this.maxRow
  }

  public getMaximumCol(): number {
    return this.maxCol
  }
}
