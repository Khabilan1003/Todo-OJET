/**
  Copyright (c) 2015, 2024, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/bar-chart-demo-strings', 'ojs/ojcontext', "ojs/ojarraydataprovider", "ojs/ojconverter-number", 'ojs/ojknockout', "ojs/ojchart", "ojs/ojswitch", "ojs/ojselectsingle"], function (ko, componentStrings, Context, ArrayDataProvider, ojconverter_number_1) {
    function ExampleComponentModel(context) {
      var self = this;

      self.stackValue = ko.observable("off");
      self.orientationValue = ko.observable("vertical");

      self.isStackOn = ko.observable(false);
      self.isOrientationVertical = ko.observable(false);

      self.isStackOn.subscribe(function () {
        if (self.isStackOn()) {
          self.stackValue("on");
        } else {
          self.stackValue("off");
        }
      })

      self.isOrientationVertical.subscribe(function () {
        if (self.isOrientationVertical()) {
          self.orientationValue("vertical");
        } else {
          self.orientationValue("horizontal");
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
          "series": "Series 1",
          "group": "Group B",
          "value": 34
        },
        {
          "id": 2,
          "series": "Series 2",
          "group": "Group A",
          "value": 55
        },
        {
          "id": 3,
          "series": "Series 2",
          "group": "Group B",
          "value": 30
        },
        {
          "id": 4,
          "series": "Series 3",
          "group": "Group A",
          "value": 36
        },
        {
          "id": 5,
          "series": "Series 3",
          "group": "Group B",
          "value": 50
        },
        {
          "id": 6,
          "series": "Series 4",
          "group": "Group A",
          "value": 22
        },
        {
          "id": 7,
          "series": "Series 4",
          "group": "Group B",
          "value": 46
        },
        {
          "id": 8,
          "series": "Series 5",
          "group": "Group A",
          "value": 22
        },
        {
          "id": 9,
          "series": "Series 5",
          "group": "Group B",
          "value": 46
        }
      ], {
        keyAttributes: 'id'
      });

      // Drop Down
      this.labelPositions = [
        { value: 'auto', label: "auto" },
        { value: 'center', label: "center" },
        { value: 'insideBarEdge', label: "insideBarEdge" },
        { value: 'outsideBarEdge', label: "outsideBarEdge" },
        { value: 'none', label: 'none' }
      ];

      this.labelPosition = ko.observable("auto");

      this.labelPositionsDP = new ArrayDataProvider(this.labelPositions, { keyAttributes: 'value' });

      this.currencyConverter = new ojconverter_number_1.IntlNumberConverter({
        style: "currency",
        currency: "USD",
      });

      this.decimalConverter = new ojconverter_number_1.IntlNumberConverter({
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      this.dataItemLabel = (dataContext) => {
        if (dataContext.group === "Group A") {
          return this.currencyConverter.format(dataContext.value);
        }
        else {
          return this.decimalConverter.format(dataContext.value);
        }
      };
    };

    return ExampleComponentModel;
  });
