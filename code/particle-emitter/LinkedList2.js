var LinkedList = (function () {
    function LinkedList() {
        this.size = 0;
        this.first = null;
        this.last = null;
        this.next = null;
        this.prev = null;
    }
    LinkedList.prototype.empty = function () {
        this.size = 0;
        this.first = null;
        this.last = null;
        this.next = null;
        this.prev = null;
    };
    LinkedList.prototype.add = function (item) {
        if (this.size === 0 && this.first === null && this.last === null) {
            this.first = item;
            this.last = item;
            this.next = item;
            item.prev = this;
        }
        else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.size++;
        return item;
    };
    LinkedList.prototype.remove = function (item) {
        if (this.size === 1) {
            this.empty();
            item.next = item.prev = null;
            return item;
        }
        if (item === this.first) {
            this.first = this.first.next;
        }
        else if (item === this.last) {
            this.last = this.last.prev;
        }
        if (item.prev) {
            item.prev.next = item.next;
        }
        if (item.next) {
            item.next.prev = item.prev;
        }
        item.next = item.prev = null;
        if (this.first === null) {
            this.last = null;
        }
        this.size--;
        return item;
    };
    return LinkedList;
}());