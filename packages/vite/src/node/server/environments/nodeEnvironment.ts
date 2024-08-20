import type { ResolvedConfig } from '../../config'
import type { DevEnvironmentContext } from '../environment'
import { DevEnvironment } from '../environment'
import { asyncFunctionDeclarationPaddingLineCount } from '../../../shared/utils'

export function createNodeDevEnvironment(
  name: string,
  config: ResolvedConfig,
  context: DevEnvironmentContext,
): DevEnvironment {
  return new DevEnvironment(name, config, {
    ...context,
    runner: {
      processSourceMap(map) {
        // this assumes that "new AsyncFunction" is used to create the module
        return Object.assign({}, map, {
          mappings:
            ';'.repeat(asyncFunctionDeclarationPaddingLineCount) + map.mappings,
        })
      },
      ...context.runner,
    },
  })
}