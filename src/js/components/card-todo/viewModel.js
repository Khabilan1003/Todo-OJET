define(['ojs/ojknockout', "ojs/ojswitch", "ojs/ojlistitemlayout", "oj-c/button", "ojs/ojbutton",],
    function () {
        function model(context) {
            let self = this;
            self.todo_id = context.properties.todo_id;
            self.message = context.properties.message;
            self.is_completed = context.properties.is_completed;

            self.deleteTask = function () {
                if (typeof context.properties.on_delete_todo === 'function') {
                    context.properties.on_delete_todo(self.todo_id);  // Pass the todo_id to delete the task
                }
            };
        }
        return model;
    }
) 