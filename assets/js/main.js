////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                   STANDATR WRITING TO FILE "units.json"
//                                  ,"yd":equivalent":91.44
// writ as new field of object, call field will be name`s needed unit. Into its put "operator" and "equivalent". 
//'operator" show which need use operator whith value of this unit with equivalent for convert to centimeter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

function addUnit(data,name, equivalent) {
    data[`${name}`] = equivalent
}

(async function () {
    //loading dada about units from json`s file 
    let units = await fetch('./assets/data/units.json');
    let json = await fetch('./assets/data/data.json')
    units = await units.json();
    json = await json.json();
    console.log(units,json);

    //Add new unit
    addUnit(units,"yd",91.44)
    
    //Regular expression
    let chek = /(\{"distance":\{"unit":"\w*"\,"value":\d*\}\,"convert_to":"\w*"\})/gm
    json = JSON.stringify(json)
    json = json.match(chek);
    console.log(json);

    //Create array for answers
    let featback = new Array();
    for (let item of json) {
        item = JSON.parse(item);
        //console.log(item)

        if (!(`${item.distance.unit}` in units || !`${item.convert_to}` in units) || typeof(+item.distance.value) != 'number') {
            console.log(`this no right`,item);
            continue;
        }

        let value = item.distance.value;
        let equvivalentFromUnit = units[item.distance.unit];
        let equvalentToUnit = units[item.convert_to];

        value = (equvivalentFromUnit * value) / equvalentToUnit;

        featback.push({
            'unit': item.convert_to,
            'value': +value.toFixed(2)
        })
        console.log(featback);
    }       

    console.log(featback);
    featback = JSON.stringify(featback);
    console.log(featback);  
}())