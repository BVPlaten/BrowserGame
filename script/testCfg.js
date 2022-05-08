/* prefClosure - simple clusure for the global configuration 
 * example :   let cnfg = prefClosure();
 *             console.log(cnfg("name"));
 *             cnfg("wurst","wasser");
 *             console.log(cnfg("wurst"));
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 30.04.2022   bvp 
 */
let prefClosure = function() {
    let options = Object.create(null);
    options["name"] = "Bernd";
    options["familieName"] = "Viehmann";
    return function(key,val = null) {
        if(val===null)
            return options[key];
        else {
            options[key] = val
        }
    }
}

let cnfg = prefClosure();
console.log(cnfg("name"));
cnfg("wurst","wasser");
console.log(cnfg("wurst"));





