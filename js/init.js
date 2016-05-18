// Global is fine for this, but safer to put it in function scope or namespace for something real.
var mutations;
function Mutations(list) {
    this.type_counts = {};
    this.chromo_counts = {};
    for (var i = 0; i < list.length; i++) {
        var type = list[i].type;
        if (this.type_counts[type]) {
            this.type_counts[type]++;
        } else {
            this.type_counts[type] = 1;
        }

        var chromo = list[i].chromosome;
        if (this.chromo_counts[chromo]) {
            this.chromo_counts[chromo]++;
        } else {
            this.chromo_counts[chromo] = 1;
        }
    }
}


