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

define(['ojs/ojcontext', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'knockout', "ojs/ojarraydataprovider", "ojs/ojtranslation", "ojs/ojhtmlutils", "ojL10n!resources/nls/menu", "ojs/ojlistview", 'ojs/ojknockout', "ojs/ojswitch", "ojs/ojlistitemlayout", "oj-c/button", "oj-c/input-text", "oj-c/form-layout", "ojs/ojbutton", "ojs/ojcollapsible", "components/card-todo/loader", "ojs/ojvalidationgroup", "ojs/ojselectsingle", "ojs/ojtable", "ojs/ojdatetimepicker", "ojs/ojdialog"],
  function (Context, ResponsiveUtils, ResponsiveKnockoutUtils, ko, ArrayDataProvider, Translations, HtmlUtils, TranslationBundle) {
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
      this.appName = ko.observable("Todo List");
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

      this.title_text = ko.observable(TranslationBundle.title);
      this.table_view_text = ko.observable(TranslationBundle.table_view);
      this.list_view_text = ko.observable(TranslationBundle.list_view);
      this.table_text = ko.observable(TranslationBundle.table);
      this.list_text = ko.observable(TranslationBundle.list);
      this.add_todo_text = ko.observable(TranslationBundle.add_todo);
      this.todo_message_text = ko.observable(TranslationBundle.todo_message);
      this.enter_todo_message_text = ko.observable(TranslationBundle.enter_todo_message);
      this.date_text = ko.observable(TranslationBundle.date);
      this.update_todo_text = ko.observable(TranslationBundle.update_todo);
      this.update_text = ko.observable(TranslationBundle.update);
      this.delete_text = ko.observable(TranslationBundle.delete);
      this.completed_text = ko.observable(TranslationBundle.completed);
      this.not_completed_text = ko.observable(TranslationBundle.not_completed);
      this.is_completed_text = ko.observable(TranslationBundle.is_completed);
      this.id_text = ko.observable(TranslationBundle.id);

      // Data for Todo List
      this.data = ko.observableArray([]);
      this.dataProvider = new ArrayDataProvider(this.data, {
        keyAttributes: 'id'
      });
      this.todoMessage = ko.observable(""); // Form Validation
      this.groupValid = ko.observable(); // Selected Row in Table
      this.firstSelected = ko.observable(null);  // Date Validation
      // Data Model to select table or list view
      this.views = [
        { id: "list", label: this.list_text() },
        { id: "table", label: this.table_text() }
      ];
      this.selectedView = ko.observable('table');
      // Observable to update table data
      this.selected_todo_id = ko.observable();
      this.selected_message = ko.observable();
      this.selected_is_completed = ko.observable();
      this.isCompletedOptions = [
        { value: true, label: this.completed_text() },
        { value: false, label: this.not_completed_text() },
      ]
      this.todoIsCompletedDP = new ArrayDataProvider(this.isCompletedOptions, {
        keyAttributes: 'value'
      })

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
      // Language Translation
      this.buttonVal = ko.observable(window.localStorage.getItem('mylang') || 'English');
      this.toolbarButtons = [
        {
          "label": "English",
          "iconClass": "demo-en-flag-icon",
          "url": "#"
        },
        {
          "label": "Français",
          "iconClass": "demo-fr-flag-icon",
          "url": "fr/index.html"
        },
      ];
      // Table Columns
      this.todoTableColumns = ko.computed(() => {
        return [
          { headerText: this.id_text(), field: 'id', id: 'todo_id' },
          { headerText: this.todo_message_text(), field: 'message', id: 'message' },
          { headerText: this.is_completed_text(), field: 'isCompleted', id: 'is_completed' }
        ];
      });

      // Dialog Handlers
      this.openAddTodoDialog = function () {
        document.getElementById("create_todo_dialog").open();
      }

      this.closeAddTodoDialog = function () {
        document.getElementById("create_todo_dialog").close();
      }

      this.openUpdateTodoDialog = function () {
        document.getElementById("update_todo_dialog").open();
      }

      this.closeUpdateTodoDialog = function () {
        document.getElementById("update_todo_dialog").close();
      }

      // LocalStorage Handlers 
      this.storeTodoDataToLocalStorage = () => {
        const list = [];
        for (let i = 0; i < this.data().length; i++) {
          list.push({ id: this.data()[i].id, message: this.data()[i].message(), isCompleted: this.data()[i].isCompleted() });
        }
        localStorage.setItem("todo_list", JSON.stringify(list));
      }

      this.loadTodoDataFromLocalStorage = () => {
        let todos = localStorage.getItem("todo_list");

        if (todos == null) return;

        todos = JSON.parse(todos);

        const list = [];
        for (let index = 0; index < todos.length; index++) {
          list.push(new Todo(todos[index].id, todos[index].message, todos[index].isCompleted));
        }
        this.data(list);
      }
      this.loadTodoDataFromLocalStorage();

      // Create Todo
      this.addTodo = (event) => {
        const valid = checkValidationGroup();
        if (!valid) return;

        const new_id = this.data().length == 0 ? 1 : this.data()[this.data().length - 1].id + 1;
        const todo = new Todo(new_id, this.todoMessage(), false);
        this.data.push(todo);
        this.todoMessage("");
        this.storeTodoDataToLocalStorage();
        this.closeAddTodoDialog();
      }

      // Delete Todo
      this.deleteTodo = (id) => {
        this.firstSelected(null);
        this.data.remove(function (todo) {
          return todo.id == id;
        });
        this.storeTodoDataToLocalStorage();
        this.closeUpdateTodoDialog();
      }

      //Update Todo
      this.updateTodo = () => {
        this.data.replace(this.firstSelected().data, new Todo(this.selected_todo_id(), this.selected_message(), this.selected_is_completed()));
        this.storeTodoDataToLocalStorage();
        this.closeUpdateTodoDialog();
      }

      this.firstSelectedRowChangedListener = (event) => {
        const itemContext = event.detail.value;
        if (itemContext && itemContext.data) {
          const todo = itemContext.data;
          this.selected_todo_id(todo.id);
          this.selected_message(todo.message());
          this.selected_is_completed(todo.isCompleted());
          this.openUpdateTodoDialog();
        }
      };

      this.openUpdateTodoDialogForListView = (data) => {
        this.selected_todo_id(data.id);
        this.selected_message(data.message());
        this.selected_is_completed(data.isCompleted());
        this.firstSelected({ data: data });
        this.openUpdateTodoDialog();
      }

      // Language Tranlslation
      this.setLang = (evt) => {
        let newLocale = "";
        let lang = evt.detail.value;
        switch (lang) {
          case "Čeština":
            newLocale = "cs-CZ";
            break;
          case "Français":
            newLocale = "fr-FR";
            break;
          case "عربي":
            newLocale = "ar-EG";
            break;
          default:
            newLocale = "en-US";
        }
        window.localStorage.setItem('mylocale', newLocale);
        window.localStorage.setItem('mylang', lang);
        location.reload();
      };
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
