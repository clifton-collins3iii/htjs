//-----------Optional
//  Initializes a few records into the object for display
var initialData = [
    { id: 'bomb', icon: '💣', name: 'Bomb', amount: 4 },
    { id: 'sword', icon: '🗡', name: 'Sword', amount: 12 },
    { id: 'chocolate', icon: '🍫', name: 'Chocolate', amount: 7 },
];

//-----------Enumerations
// The icons to display
var icons = {
    sword: '🗡',
    chocolate: '🍫',
    chips: '🍿',
    egg: '🥚',
    bone: '🦴',
    bomb: '💣',
};

//  First model to be used in Panel1
function InventoryViewModel() {
    var self = this;
    //---------PROPERTIES
    // record/object fields
    self.name = ko.observable('').extend({ required: true, });
    self.icon = ko.observable('bone');
    self.amount = ko.observable().extend({ required: true, min: 1, });

    // remove remarks for which initialize to use, data or no data
    //self.items = ko.observableArray(initialData);
    self.items = ko.observableArray();

    //------METHODS
    // Add new item
    self.addItem = function (newItem) {
        if (!newItem) return;

        self.items.push({
            id: generateId(),
            name: newItem.name,
            icon: icons[newItem.icon],
            amount: newItem.amount,
        });
    };

    // Remove item
    self.removeItem = function (item) {
        self.items.remove(item);
    };

    // Submit the form
    self.handleSubmit = function () {
        var errors = ko.validation.group(self);
        console.log(errors);
        if (errors().length > 0) {
            errors.showAllMessages();
            return;
        }

        self.addItem({
            name: self.name(),
            icon: self.icon(),
            amount: self.amount(),
        });
    };
}
//ko.applyBindings(new InventoryViewModel(), document.querySelector('#panel1'));

//  Second model, to be used in Panel2
function ClockViewModel() {
    var self = this;
    self.clockinfo = ko.observable();
    self.clockinfo('');
    setInterval(() => self.updateClockInfo(), 1000);

    self.updateClockInfo = function () {
        self.clockinfo(nowDateTime());
    }

    function nowDateTime() {
        return new Date();
    }
}
ko.applyBindings(new ClockViewModel(), document.querySelector("#panel2"));
/**
 * Very simple id generator, doesn't guarantee uniqueness, but it's
 * absolutely fine for this simple example.
 */
function generateId() {
    return 'id' + Math.random().toString(16).slice(2);
}
