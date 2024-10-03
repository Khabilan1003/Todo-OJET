/**
  Copyright (c) 2015, 2024, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/pie-chart-demo-strings', 'ojs/ojcontext', "ojs/ojarraydataprovider", 'ojs/ojknockout', "ojs/ojchart", "ojs/ojswitch", "ojs/ojselectsingle"], function (ko, componentStrings, Context, ArrayDataProvider) {

    function ExampleComponentModel(context) {

      let self = this;

      self.threeDValue = ko.observable("off");
      self.is3D = ko.observable(false);

      this.is3D.subscribe(function () {
        if (self.is3D()) {
          self.threeDValue("on");
        } else {
          self.threeDValue("off");
        }
      })
      this.dataProvider = new ArrayDataProvider([
        {
          "id": 0,
          "series": "Series 1",
          "group": "Group A",
          "value": 42
        },
        {
          "id": 1,
          "series": "Series 2",
          "group": "Group A",
          "value": 55
        },
        {
          "id": 2,
          "series": "Series 3",
          "group": "Group A",
          "value": 36
        },
        {
          "id": 3,
          "series": "Series 4",
          "group": "Group A",
          "value": 22
        },
        {
          "id": 4,
          "series": "Series 5",
          "group": "Group A",
          "value": 22
        }
      ], {
        keyAttributes: "id",
      });

      // Drop Down
      this.labelPositions = [
        { value: 'auto', label: "auto" },
        { value: 'outsideSlice', label: "outsideSlice" },
        { value: 'center', label: "center" },
        { value: 'none', label: 'none' }
      ];

      this.labelPosition = ko.observable("none");

      this.labelPositionsDP = new ArrayDataProvider(this.labelPositions, { keyAttributes: 'value' });
    };

    return ExampleComponentModel;
  });
