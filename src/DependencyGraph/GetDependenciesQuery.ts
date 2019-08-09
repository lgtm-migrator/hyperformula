import {IGetDependenciesQuery} from './Graph'
import {AddressMapping} from './AddressMapping'
import {RangeMapping} from './RangeMapping'
import {FormulaCellVertex, Vertex} from './'
import {AbsoluteCellRange} from '../AbsoluteCellRange'
import {collectDependencies} from '../parser'
import {absolutizeDependencies} from '../absolutizeDependencies'
import {CellDependency} from '../CellDependency'

export class GetDependenciesQuery implements IGetDependenciesQuery<Vertex> {
  constructor(
    private readonly rangeMapping: RangeMapping,
    private readonly addressMapping: AddressMapping
  ) {
  }

  public call(vertex: Vertex) {
    if (!(vertex instanceof FormulaCellVertex)) {
      return null
    }

    const deps = collectDependencies(vertex.getFormula())
    const absoluteDeps = absolutizeDependencies(deps, vertex.getAddress())
    const verticesForDeps = new Set(absoluteDeps.map((dep: CellDependency) => {
      if (dep instanceof AbsoluteCellRange) {
        return this.rangeMapping.getRange(dep.start, dep.end)!
      } else {
        return this.addressMapping.fetchCell(dep)
      }
    }))
    return verticesForDeps
  }
}