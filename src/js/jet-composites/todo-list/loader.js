/**
  Copyright (c) 2015, 2024, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./todo-list-view.html', './todo-list-viewModel', 'text!./component.json', 'css!./todo-list-styles.css'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('todo-list', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);