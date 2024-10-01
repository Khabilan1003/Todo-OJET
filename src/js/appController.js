/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcontext', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'knockout', "ojs/ojarraydataprovider", "ojs/ojlistview", 'ojs/ojknockout', "ojs/ojswitch", "ojs/ojlistitemlayout", "oj-c/button", "oj-c/input-text", "oj-c/form-layout", "ojs/ojbutton", "ojs/ojcollapsible", "components/card-todo/loader", "ojs/ojvalidationgroup", "ojs/ojselectsingle", "ojs/ojtable", "ojs/ojdatetimepicker"],
  function (Context, ResponsiveUtils, ResponsiveKnockoutUtils, ko, ArrayDataProvider) {
    function Todo(id, message, isCompleted) {
      this.id = id;
      this.message = ko.observable(message);
      this.isCompleted = ko.observable(isCompleted);
    }

    function ControllerViewModel() {

      // Media queries for responsive layouts
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area
      this.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      this.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      this.footerLinks = [
        { name: 'About Oracle', linkId: 'aboutOracle', linkTarget: 'http://www.oracle.com/us/corporate/index.html#menu-about' },
        { name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" },
        { name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" },
        { name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" },
        { name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" },
      ];

      // Data Required for the App
      this.todoMessage = ko.observable("");

      // Form Validation
      this.groupValid = ko.observable();

      this.data = ko.observableArray([
        new Todo(1, "Todo 1", false),
        new Todo(2, "Todo 2", true),
        new Todo(3, "Todo 3", false),
        new Todo(4, "Todo 4", false),
        new Todo(5, "Todo 5", true),
      ]);

      this.dataProvider = new ArrayDataProvider(this.data, {
        keyAttributes: 'id'
      });

      this.addRow = () => {
        const valid = checkValidationGroup();
        if (!valid) return;

        const new_id = this.data().length == 0 ? 1 : this.data()[this.data().length - 1].id + 1;
        const todo = new Todo(new_id, this.todoMessage(), false);
        this.data.push(todo);
        this.todoMessage("");
      }

      // Table Related Things
      this.firstSelected = ko.observable(null);

      this.deleteTodo = (id) => {
        this.firstSelected(null);
        this.data.remove(function (todo) {
          return todo.id == id;
        });
      }

      // Data Model to select table or list view
      this.views = [
        { value: "list", label: "List View" },
        { value: "table", label: "Table View" }
      ];

      this.viewsDP = new ArrayDataProvider(this.views, { keyAttributes: 'value' });

      this.selectedView = ko.observable('table');

      this.selected_todo_id = ko.observable();
      this.selected_message = ko.observable();
      this.selected_is_completed = ko.observable();

      this.firstSelectedRowChangedListener = (event) => {
        const itemContext = event.detail.value;
        if (itemContext && itemContext.data) {
          const todo = itemContext.data;
          this.selected_todo_id(todo.id);
          this.selected_message(todo.message());
          this.selected_is_completed(todo.isCompleted());
        }
      };

      this.isCompletedOptions = [
        { value: true, label: "Completed" },
        { value: false, label: "Not Completed" },
      ]
      this.todoIsCompletedDP = new ArrayDataProvider(this.isCompletedOptions, {
        keyAttributes: 'value'
      })

      this.updateTodo = () => {
        this.data.replace(this.firstSelected().data, new Todo(this.selected_todo_id(), this.selected_message(), this.selected_is_completed()));
      }

      const holidayMap = new Map();
      holidayMap.set(new Date("2024-01-13").getTime(), "Pongal");
      holidayMap.set(new Date("2024-10-02").getTime(), "Gandhi Jayanthi");
      holidayMap.set(new Date("2024-10-10").getTime(), "Ayudha Pooja");

      this.dateValidator = {
        validate: function (value) {
          const date = new Date(value).getTime();
          if (holidayMap.has(date)) {
            throw new Error(holidayMap.get(date));
          }
        },
        getHint: function () {
          return "Please don't select holidays";
        }
      }
    }

    function checkValidationGroup() {
      const tracker = document.getElementById("tracker");
      if (tracker.valid === "valid") {
        return true;
      }
      else {
        tracker.showMessages();
        tracker.focusOn("@firstInvalidShown");
        return false;
      }
    }

    // release the application bootstrap busy state
    Context.getPageContext().getBusyContext().applicationBootstrapComplete();

    return new ControllerViewModel();
  }
);
