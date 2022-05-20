// function time//


//function electricity//

//dunno how to make a function yet
//electricity consumption


// try to use switch/case for the natural gas function
var natgas_cons_unit="Gj"
var natgas_cons_4= 134

switch(natgas_cons_unit){
    case "Therm":
        var cons=natgas_cons_4/10;
        break;
    case "Ccf":
        var cons=natgas_cons_4/10.37;
        break;
    case "Gj":
        var cons=natgas_cons_4/1.055056;
        break;   
    case "m3":
        var cons=natgas_cons_4/28.26369;
        break; 
    case "MMBtu":
        var cons=natgas_cons_4
        break;   
    default:
        var cons=0  
}

console.log(cons)
