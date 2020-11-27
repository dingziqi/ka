class Plugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('Plugin', compilation => {
      console.log('here');
      // TODO: 非post编译不触发rebuild

      compilation.hooks.finishModules.tap('Plugin', modules => {
        console.log('finishModules');
        const _modules = modules.filter(module => {
          const loaders = module.loaders || [];

          return loaders.find(loader => loader.loader.match('page-loader'));
        });

        let rebuildNum = 1;

        if (_modules.length > 0) {
          _modules.forEach(module =>
            compilation.rebuildModule(module, () => {
              if (rebuildNum === _modules.length) {
                // callback();
                compilation.createModuleAssets();
              } else {
                rebuildNum++;
              }
            }),
          );
        }
      });

    });
  }
  // apply(compiler) {
  //   compiler.hooks.afterCompile.tapAsync('Plugin', (compilation, callback) => {
  //     console.log('after compile');
  //     callback();
  //   });

  //   // compiler.hooks.emit.tapAsync('finishModules', function (modules = []) {
  //   //   console.log(Object.keys(modules));
  //   //   const _modules = modules.filter(module => {
  //   //     const loaders = module.loaders || [];

  //   //     return loaders.find(loader => loader.loader.match('page-loader'));
  //   //   });
  //   //   console.log(_modules);
  //   // });
  // }
}

module.exports = Plugin;
