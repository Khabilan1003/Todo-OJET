/**
  Copyright (c) 2015, 2024, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./pie-chart-demo-view.html', './pie-chart-demo-viewModel', 'text!./component.json', 'css!./pie-chart-demo-styles.css'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('pie-chart-demo', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);