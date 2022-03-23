

window.onload = () => {
    const getmasterfile = async () => {
        const response = await fetch("https://raw.githubusercontent.com/mantassky/Seimas-project/main/master file.json")
        master = await response.json()
    }
    getmasterfile()
    var kokiaKad = "8"
    var consoleogint = document.getElementById("consolelogint");
    var duotsarasa = document.getElementById("duotsarasa");
    var padaliniai = {}
    var kadencijos = {
        "1": {
            data_nuo: "1990-03-10",
            data_iki: "1992-11-22"
        },
        "2": {
            data_nuo: "1992-11-24",
            data_iki: "1996-11-22"
        },
        "3": {
            data_nuo: "1996-11-25",
            data_iki: "2000-10-18"
        },
        "4": {
            data_nuo: "2000-10-19",
            data_iki: "2004-11-14"
        },
        "5": {
            data_nuo: "2004-11-15",
            data_iki: "2008-11-17"
        },
        "6": {
            data_nuo: "2008-11-17",
            data_iki: "2012-11-16"
        },
        "7": {
            data_nuo: "2012-11-16",
            data_iki: "2016-11-14"
        },
        "8": {
            data_nuo: "2016-11-14",
            data_iki: "2020-11-13"
        },
        "9": {
            data_nuo: "2020-11-13",
            data_iki: ""
        }
    }

    var objFrakcijos = {
        "1322": {
            trumpinys: "D",
            spalva: "grey"
        },
        "1154": {
            trumpinys: "LP",
            spalva: "deeppink"
        },
        "870": {
            trumpinys: "LRLS",
            spalva: "orange"
        },
        "1022": {
            trumpinys: "TS-LKD",
            spalva: "teal"
        },
        "1070": {
            trumpinys: "LVŽS",
            spalva: "green"
        },
        "874": {
            trumpinys: "DP",
            spalva: "darkblue"
        },
        "793": {
            trumpinys: "LSP",
            spalva: "red"
        },
        "1318": {
            trumpinys: "R",
            spalva: "darkred"
        },
        "18": {
            trumpinys: "LG",
            spalva: "green"
        },
        "19": {
            trumpinys: "LDDPF",
            spalva: "#c22e30"
        },
        "36": {
            trumpinys: "SDF",
            spalva: "#e10415"
        },
        "577": {
            trumpinys: "LRF",
            spalva: "gray"
        },
        "579": {
            trumpinys: "TiT",
            spalva: "#bec023"
        },
        "580": {
            trumpinys: "JF",
            spalva: "gray"
        },
        "581": {
            trumpinys: "CF",
            spalva: "#008d3f"
        },
        "786": {
            trumpinys: "SD2000",
            spalva: "#901d78"
        },
        "787": {
            trumpinys: "MKD",
            spalva: "grey"
        },
        "789": {
            trumpinys: "NK",
            spalva: "grey"
        },
        "790": {
            trumpinys: "LLRA",
            spalva: "grey"
        },
        "792": {
            trumpinys: "TS",
            spalva: "#0c5b22"
        },
        "49": {
            trumpinys: "TS-LK",
            spalva: "#3164b7"
        },
        "794": {
            trumpinys: "LF",
            spalva: "#ddbc51"
        },
        "795": {
            trumpinys: "NSF",
            spalva: "#280c70"
        },
        "796": {
            trumpinys: "JF",
            spalva: "#3164b7"
        },
        "797": {
            trumpinys: "VL",
            spalva: "#bad759"
        },
        "888": {
            trumpinys: "LiCS",
            spalva: "#fcd211"
        },
        "980": {
            trumpinys: "PD",
            spalva: "#033262"
        },
        "1051": {
            trumpinys: "LLRA",
            spalva: "#3164b7"
        },
        "47": {
            trumpinys: "Mišri Seimo narių grupė",
            spalva: "#616A6B"
        },
        "1098": {
            trumpinys: "LSDDP",
            spalva: "#bb2a31"
        },
        "1021": {
            trumpinys: "TP",
            spalva: "#f7bc00"
        },
        "-1": {
            trumpinys: "SP",
            spalva: "black"
        },
        "-2": {
            trumpinys: "NERASTA",
            spalva: "crimson"
        },
        "-3": {
            trumpinys: "Be pareigų",
            spalva: "crimson"
        }
    }

    consoleogint.onclick = () => {


        function apdorojimas(kad, master) {
            kad.SeimoKadencija.SeimoNarys.forEach(narys => {
                delete narys.Kontaktai
                delete narys.lytis
                delete narys.biografijos_nuoroda

                if (narys.hasOwnProperty("Pareigos")) {
                    //Isfiltruojamos komisijos, visos parlamentines grupes
                    var filtered = narys["Pareigos"].filter(pareiga => !pareiga.hasOwnProperty("parlamentinės_grupės_id") && pareiga.pareigos.slice(0, 9) !== "Komisijos" && pareiga.padalinio_pavadinimas.slice(-11) !== "pakomitetis");
                    narys.Pareigos = filtered.splice(0)
                    narys.Pareigos.forEach(pareiga => {
                        if ((pareiga.pareigos === "Pirmininkas" && pareiga.padalinio_pavadinimas === "Seimo valdyba") || pareiga.pareigos === "Seimo Pirmininkas" || pareiga.pareigos === "Seimo Pirmininkė") {
                            pareiga.padalinio_id = "-1";
                        }
                    });
                }
            });

            master[kad.SeimoKadencija.kadencijos_id] = kad.SeimoKadencija
        }

        function padSkirtsymas(master, padaliniai) {
            for (let i = 1; i < 10; i++) {
                master[i].SeimoNarys.forEach(narys => {
                    if (narys.hasOwnProperty("Pareigos")) {
                        narys.Pareigos.forEach(pareiga => {
                            if (pareiga.hasOwnProperty("padalinio_id") && pareiga.hasOwnProperty("padalinio_pavadinimas")) {
                                padaliniai[pareiga.padalinio_id] = pareiga.padalinio_pavadinimas
                            }
                        });
                    }
                });
            }

            padaliniai["-1"] = "Seimo Pirmininkas/Pirmininkė"
        }

        const gauti = async () => {
            for (let i = 1; i < 10; i++) {
                const response = await fetch("https://raw.githubusercontent.com/mantassky/Seimas-project/main/sn" + i + ".json")
                const data = await response.json()
                apdorojimas(data, master)
                console.log(data)

            }
            var jsonData = JSON.stringify(master);
            console.log(jsonData)
            padSkirtsymas(master, padaliniai)
            var jsonData = JSON.stringify(padaliniai)
            console.log(jsonData)
        }
        //SAUKIMAI
        gauti()


    }


    duotsarasa.onclick = () => {
        duotsarasa.innerText = "sarasas duotas";

        function compareFrakcija(a, b) {
            if (a.dabartine_fr_id < b.dabartine_fr_id) {
                return -1;
            } else if (a.dabartine_fr_id > b.dabartine_fr_id) {
                return 1;
            } else {
                return 0;
            }
        }

        /* const frakcijuID = ["1322", "1154", "870", "1022", "1070", "874", "793", "1318", "35"];
        const frakcijos = ["D", "LP", "LRLS", "TS-LKD", "LVZS", "DP", "LSP", "R", "SP"];
        const frakcijuSpalvos = ["grey", "deeppink", "orange", "teal", "green", "darkblue", "red", "darkred", "black"];*/

        var toRemove = [];

        //Suskirtymas i dabartines frakcijas
        master[kokiaKad].SeimoNarys.forEach(narys => {
            if (narys.data_iki === kadencijos[kokiaKad].data_iki) {
                if (narys.hasOwnProperty('Pareigos')) {
                    tp = narys.Pareigos.find(pareiga => objFrakcijos.hasOwnProperty(pareiga.padalinio_id) && pareiga.data_iki === kadencijos[kokiaKad].data_iki)
                    if (!tp) {
                        narys.dabartine_fr_id = "-2"
                    } else {
                        narys.dabartine_fr_id = tp.padalinio_id
                    }
                } else {
                    narys.dabartine_fr_id = '-3'
                }

            } else {
                toRemove.push(master[kokiaKad].SeimoNarys.indexOf(narys));
            }
        });

        //Panaikinami dabar nesantys nariai
        for (var i = 0; i < toRemove.length; i++) {
            master[kokiaKad].SeimoNarys.splice(toRemove[i] - i, 1);
        }

        master[kokiaKad].SeimoNarys.sort(compareFrakcija);

        nariuList = document.createElement('ol');
        duotsarasa.appendChild(nariuList);

        //Pridejimas nariu i sarasa
        master[kokiaKad].SeimoNarys.forEach(narys => {
            let listItem = document.createElement("li");
            nariuList.appendChild(listItem);
            listItem.innerText = objFrakcijos[narys.dabartine_fr_id].trumpinys + " " + narys.vardas + " " + narys.pavardė;
            listItem.setAttribute("style", "color:" + objFrakcijos[narys.dabartine_fr_id].spalva);
        });
    }

    var dropdown = document.getElementById("kadencijaDropDown")

    dropdown.onclick = () => {
            kokiaKad = dropdown.value.toString()
            console.log(kokiaKad)
            duotsarasa.onclick()
    }

}