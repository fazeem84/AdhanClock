window.Vue = require("vue");
let { DateTime } = require("luxon");
let { moment } = require("vue-moment");
//import response from "../assets/sample.json";
import axios from "axios";
import * as helper from "../helper/helper.js";
var app = new Vue({
    el: "#app",
    data: {
        mode: "clock",
        now: DateTime.local(),
        nxtPrayer: {name:"Fajr",time:"00:00"},
        timeFormat: "hh:mm:ss"
    },
    computed: {
        appStyles() {
            return {
                backgroundColor: `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b})`
            };
        },
        clockButtonStyles() {
            return this.mode != "clock"
                ? { backgroundColor: "rgba(255, 255, 255, .5)" }
                : {};
        },
        hexButtonStyles() {
            return this.mode != "hex"
                ? { backgroundColor: "rgba(255, 255, 255, .5)" }
                : {};
        },
        hex() {
            return Object.values(this.rgb)
                .map(value =>
                    value
                        .toString(16)
                        .toUpperCase()
                        .padStart(2, "0")
                )
                .join(":");
        },
        rgb() {
            return {
                r: Math.round(this.now.hour * (255 / 23)),
                g: Math.round(this.now.minute * (255 / 59)),
                b: Math.round(this.now.second * (255 / 59))
            };
        },
        time() {
            return this.now.toFormat(this.timeFormat);
        },
        nxtPrayer() {
            debugger;
            if (this.nxtPrayer.name) {
                return this.nxtPrayer.name;
            }else{
                return "No Data";
            }
        }
    },
    created() {
        interval = setInterval(() => {
            this.now = DateTime.local();
            if (this.info) {
                var today = helper.getTodaysData(this.info);
                if (today) {
                    var nxtPrayer = helper.getNextPrayer(today);
                    console.log(
                        "Next Prayer today" + JSON.stringify(nxtPrayer)
                    );
                    this.nxtPrayer = nxtPrayer;
                }
            }
        }, 1000);

        this.mode = localStorage.getItem("mode") || "clock";
        this.timeFormat = localStorage.getItem("timeFormat") || "hh:mm:ss";
    },
    mounted() {
        console.log("-----------in Mount----------");
        axios
            .get(
                "http://api.aladhan.com/v1/calendarByAddress?address=BD1 2NB&method=2&month="+this.now.month+"&year="+this.now.year
            )
            .then(response => {
                console.log("response.data" + response.data.data);
                this.info = response.data.data;
            });
    },
    watch: {
        mode: mode => localStorage.setItem("mode", mode),
        timeFormat: format => localStorage.setItem("timeFormat", format)
    }
});
