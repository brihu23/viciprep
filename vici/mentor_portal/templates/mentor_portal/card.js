$(document).ready(function() {

            
            var paginator_count = 6;

            if( $('#some-element').css('display')=='none') {
                paginator_count = 4;     
            }            

            if (is_mobile == true) {
                //Conditional script here
            }
            
            var college_array = [];   
            var current_show = [];       
            
            $(".colleges_info").each(function(index){
                var colleges = ($(this).html()).trim().split(" ")
                console.log(colleges)
                for (var i=0; i < colleges.length; i++){
                    //console.log(colleges[i])
                    if (!(contains(colleges[i], college_array))){
                        college_array.push(colleges[i])
                    } 
                }                
            })

            delete college_array[0]
            college_array.sort()
            college_array.unshift("All-Colleges")
            console.log(college_array)

            for (var i=0; i < college_array.length - 1 ; i++){
                
                
                $("#colleges").append(new Option(college_array[i].replace("-", " "), college_array[i]))
            }

            var majors_array = [];            
            $(".majors_info").each(function(index){
                var majors = ($(this).html()).trim().split(" ")
                console.log(majors)
                for (var i=0; i < majors.length; i++){
                    //console.log(colleges[i])
                    if (!(contains(majors[i], majors_array))){
                        majors_array.push(majors[i])
                    } 
                }                
            })

            delete majors_array[0]
            majors_array.sort()
            majors_array.unshift("All-Majors")
            console.log(majors_array)

            var dogpark = 'k'
            var catpark = "e"
            var hugo = 'y'
            var boog = 'VVF'
            var piper = 'X3'
            var mango = '0Cgir'
            var icecream = 'c'
            var schmeagle = 'v'
            var goob = 'z'
            var bubby = 'W'

            for (var i=0; i < majors_array.length - 1 ; i++){
                
                
                $("#majors").append(new Option(majors_array[i].replace("-", " "), majors_array[i]))
            }
            run()
            paginator_generator()
            $("#colleges").on('change', function() {
                run()
                paginator_generator()
            })
            $("#majors").on('change', function() {
                run()
                paginator_generator()
            })
            $("#grad").on('change', function() {
                run()
                paginator_generator()
            })
            $("#home").on('change', function() {
                run()
                paginator_generator()
            })
            $("#interests").on('change', function() {
                run()
                paginator_generator()
            })

            $("#highschool").on('change', function() {
                run()
                paginator_generator()
            })


            var chat = false  
            
            var Airtable = require('airtable');
            var base = new Airtable({apiKey: dogpark + catpark + hugo + boog + piper + mango + icecream + schmeagle + goob + bubby}).base('appeukvokZltY5cuI');   
            var base1 = new Airtable({apiKey: dogpark + catpark + hugo + boog + piper + mango + icecream + schmeagle + goob + bubby}).base('appaaHT8iiSvw77Jt');
            

            available_times()  
            openModalOnHash()

            function openModalOnHash() {
              if(window.location.hash) {
                var hash = window.location.hash.substring(1);
                console.log(hash)
                $('#'+hash).modal('show');
              }
            }


  

             
            
            function available_times(){
                $(".gallery-button").click(function () {
                    
                    
                    var friend_drop = false;
                    
                    var current_selected_day
                    var current_selected_time
                    var current_selected_time_date_format
                    var current_selected_month_date_format
                    var final_date_format
                    var start_final_date_format
                    

                    var id = $(this).attr('id')
                    $("#disclaimer-" + id).show()
                    
                    //console.log(typeof $("#friend-email-" + id).val() === "undefined")
                    var filter = "({Mentor ID} = "+ id + ")"
                    var used_dates = []
                   
                    base1('Table 1').select({
                    filterByFormula: filter}).eachPage(function page(records, fetchNextPage) {
                        // This function (`page`) will get called for each page of records.

                        records.forEach(function(record) {
                            used_dates.push( record.get("Start Time"))
                            

                        });  
                        fetchNextPage();


                    }, function done(err) {
                        if (err) { console.error(err); return;}

                    base('Table 1').select({
                    filterByFormula: filter}).eachPage(function page(records, fetchNextPage) {
                        // This function (`page`) will get called for each page of records.

                        records.forEach(function(record) {
                            used_dates.push( record.get("Start Time"))
                            

                        });  
                        fetchNextPage();


                    }, function done(err) {
                        if (err) { console.error(err); return;}
                        
                    console.log("used dates", used_dates)
                    
                    friend()
                    
                    $("#day-" + id).find('option').remove().end()
                    $("#pop-up-" + id).hide()
                    $("#chat-" + id).show()
                    var time_string = $("#time-" + id).html().replace(/y\s+/g, "y|").trim()
                    //console.log(time_string)
                    var pairs = time_string.split("|")
                    pairs.pop()
                    var times = {
                        Monday: [],
                        Tuesday: [],
                        Wednesday: [],
                        Thursday: [],
                        Friday: [],
                        Saturday: [],
                        Sunday: []
                    }

                    for (var i = 0; i < pairs.length; i++){

                        var day_split = pairs[i].split(", ")
                        for (var j = 1; j < day_split.length; j++){
                            var current_time =  times[day_split[j]]
                            current_time.push(day_split[0]) 
                            times[day_split[j]] = current_time
                        }  
                                         
                    }     

                    for (var key in times) {
                        if (times[key].length != 0) {
                            $("#day-" + id).append(new Option(key, key))                           
                        }
                    }

                    current_selected_day = $("#day-" + id).val()
                    populate_times(current_selected_day)  
                    current_selected_time = $("#time1-" + id).val()
                    render_future_dates(current_selected_day, current_selected_time)
                    start_final_date_format = $("#date1-" + id).val() 
                    console.log("start_final_date_format", start_final_date_format)
                    $("#date1-"+ id).change(function () {
                       //var current_selected_time = $("#time1-" + id).val()
                       //render_future_dates(current_selected_day, current_selected_time)
                       start_final_date_format = $("#date1-" + id).val()
                       console.log("start_final_date_format", start_final_date_format)
                       console.log(addMinutes(new Date(start_final_date_format), 20).toISOString())
                       //console.log($("#date1-" + id + " option:selected").text() + " at " + $("#time1-" + id + " option:selected" ).text()+ " EST")
                    })

                    $("#time1-" + id).change(function (){
                        var current_selected_day = $("#day-" + id).val()
                        //populate_times(current_selected_day)
                        var current_selected_time = $("#time1-" + id).val()
                        render_future_dates(current_selected_day, current_selected_time)
                        start_final_date_format = $("#date1-" + id).val()
                        console.log("start_final_date_format", start_final_date_format)
                        console.log(addMinutes(new Date(start_final_date_format), 20).toISOString())
                    })

                    $("#day-" + id).change(function (){
                        var current_selected_day = $("#day-" + id).val()
                        populate_times(current_selected_day)
                        var current_selected_time = $("#time1-" + id).val()
                        render_future_dates(current_selected_day, current_selected_time)
                        start_final_date_format = $("#date1-" + id).val()
                        console.log("start_final_date_format", start_final_date_format)
                        console.log(addMinutes(new Date(start_final_date_format), 20).toISOString())
                    })

                    console.log(addMinutes(new Date(start_final_date_format), 20).toISOString())
                    //console.log($("#date1-" + id + " option:selected").text() + " at " + $("#time1-" + id + " option:selected" ).text()+ " EST")



                    $("#chat-" + id).click(function () {
                        $(this).hide()
                        $("#disclaimer-" + id).hide()
                        $("#pop-up-" + id).show()
                    })

                    $("#pop-up-" + id).submit(function (event) {
                        //submit variables
                        event.preventDefault()
                        var el = $(this);
                        el.attr('disabled', 'disabled');
                        var student_first_name = $("#student-first-name-" + id).val().trim()
                        var student_last_name = $("#student-last-name-" + id).val().trim()
                        var student_email = $("#student-email-" + id).val().trim()
                        var parent_first_name = $("#parent-first-name-" + id).val().trim()
                        var parent_last_name = $("#parent-last-name-" + id).val().trim()
                        var parent_email = $("#parent-email-" + id).val().trim()
                        var hometown = $("#hometown-" + id).val().trim()
                        var state = $("#state-" + id).val().trim()
                        var school  = $("#school-" + id).val().trim()                 
                        var zipcode = $("#zipcode-" + id).val().trim() 
                        var gradyear = $("#gradyear-" + id).val().trim() 
                        var mentor_first_name = $("#info-first-name-" + id).html().trim()
                        var mentor_email = $("#info-email-" + id).html().trim()
                        var mentor_bio = $("#info-bio-" + id).html().trim()
                        var mentor_college = $("#info-college-" + id).html().trim()
                        var start_time = start_final_date_format
                        var end_time = addMinutes(new Date(start_final_date_format), 20).toISOString()
                        var formatted_start_time = $("#date1-" + id + " option:selected").text() + " at " + $("#time1-" + id + " option:selected" ).text()
                        var friend_first = $("#friend-first-name-" + id).val().trim()
                        var friend_last = $("#friend-last-name-" + id).val().trim()
                        var friend_email = $("#friend-email-" + id).val().trim()
                        console.log(typeof start_time, start_time)
                        if(typeof start_time === "undefined" || typeof end_time === "undefined"){
                            event.preventDefault()
                            alert("That's an error! We're working on a fix right away, please try refreshing the page and booking again!")
                            location.reload();
                        }


                        console.log(typeof friend_email, typeof friend_first , typeof friend_last)
                        console.log( friend_email, "dfkn", friend_first , "kfs", friend_last)
                        if (check_form_input(student_email, parent_email)){
                            event.preventDefault()
                            alert("Check your emails! Your email and your parent's email can't be the same! We are required by COPPA ")
                            location.reload();
                        }

                        if (friend_email === "" || friend_first === "" || friend_last === "" ){
                            
                            base('Table 1').create([
                              {
                                "fields": {
                                    "First Name": student_first_name,
                                    "Last Name" : student_last_name,
                                    "Student Email": student_email,
                                    "Parent First Name": parent_first_name,
                                    "Parent Last Name": parent_last_name,
                                    "Parent Email": parent_email,
                                    "Hometown": hometown,
                                    "State": state,
                                    "School Name": school,
                                    "School Zipcode": zipcode,
                                    "High School Graduation Year": gradyear,
                                    "Mentor First Name": mentor_first_name,
                                    "Mentor Email": mentor_email,
                                    "Mentor Bio": mentor_bio,
                                    "Mentor College": mentor_college,
                                    "Start Time": start_time,
                                    "End Time": end_time,
                                    "Mentor ID": id,
                                    "Formatted Time": formatted_start_time
                                }
                              },

                            ], {typecast: true},  function done(err, records) {
                              if (err) {
                                console.error(err);
                                return;
                              }
                              records.forEach(function (record) {
                                console.log(record.getId());
                              });
                              alert("Nice! 🔥 You're set to meet with " + mentor_first_name + " on " + formatted_start_time + "! Check your email for the gcal invite and intro email! Make sure to introduce yourself! Hope you have an amazing conversation 🤩")
                              location.reload();
                            });
                        } else {
                            console.log("base1")
                            base1('Table 1').create([
                              {
                                "fields": {
                                    "First Name": student_first_name,
                                    "Last Name" : student_last_name,
                                    "Student Email": student_email,
                                    "Parent First Name": parent_first_name,
                                    "Parent Last Name": parent_last_name,
                                    "Parent Email": parent_email,
                                    "Hometown": hometown,
                                    "State": state,
                                    "School Name": school,
                                    "School Zipcode": zipcode,
                                    "High School Graduation Year": gradyear,
                                    "Mentor First Name": mentor_first_name,
                                    "Mentor Email": mentor_email,
                                    "Mentor Bio": mentor_bio,
                                    "Mentor College": mentor_college,
                                    "Start Time": start_time,
                                    "End Time": end_time,
                                    "Mentor ID": id,
                                    "Formatted Time": formatted_start_time,
                                    "Friend First Name": friend_first,
                                    "Friend Last Name": friend_last,
                                    "Friend Email": friend_email,

                                }
                              },

                            ], {typecast: true},  function done(err, records) {
                              if (err) {
                                console.error(err);
                                return;
                              }
                              records.forEach(function (record) {
                                console.log(record.getId());
                              });
                              alert("Nice! 🔥 You and " + friend_first + " are set to meet with " + mentor_first_name + " on " + formatted_start_time + "  Check your email for the gcal invite and intro email! Make sure to introduce yourself! Hope you have an amazing conversation 🤩")
                              location.reload();
                            });

                        }



                        
                    })
                    

                        
            


                    ///////////////////////////////////////////////////////////////////////functions
   
                    



                    function populate_times(day){
                        console.log("populate times running")
                        var day_available_times = times[day]                        
                        $("#time1-" + id).find('option').remove().end()
                        for (var i = 0; i < day_available_times.length; i++){                            
                            $("#time1-" + id).append(new Option(day_available_times[i] + " EST", day_available_times[i]))
                        }




                    }

                    function render_future_dates(day, time) {

                        var time_to_check = to_24hr(time)
                        var first_check_date
                        var second_check_date
                        var third_check_date
                        var already_passed = false
                        var first_date_formatted
                        var second_date_formatted
                        var third_date_formatted
                        var first_date
                        var second_date
                        var third_date
                        var date_dict = {};
                        var days = {
                            Monday: 1,
                            Tuesday: 2,
                            Wednesday: 3,
                            Thursday: 4,
                            Friday: 5,
                            Saturday: 6,
                            Sunday: 7
                            }
                        var current_full_date = new Date();
                        var current_day = current_full_date.getDay();
                        var current_date = current_full_date.getDate();

                        if (current_day >= days[day]){
                            already_passed = true
                            first_date = addDays(addWeeks(current_full_date,1), days[day] - current_day)
                            

                        } else {
                            first_date = addDays(current_full_date, days[day] - current_day)
                            
                        }

                        first_check_date = check_date(format_month(first_date), time_to_check)
                        while (already_booked(first_check_date, used_dates)){
                            first_date = addWeeks(first_date, 1)
                            first_check_date = check_date(format_month(first_date), time_to_check)
                        }
                        second_date = (addWeeks(first_date, 1))
                        second_check_date = check_date(format_month(second_date), time_to_check)
                        while (already_booked(second_check_date, used_dates)){
                            second_date = addWeeks(second_date, 1)
                            second_check_date = check_date(format_month(second_date), time_to_check)
                        }
                        third_date = (addWeeks (second_date, 1))
                        third_check_date = check_date(format_month(third_date), time_to_check)
                        while (already_booked(third_check_date, used_dates)){
                            third_date = addWeeks(third_date, 1)
                            third_check_date = check_date(format_month(third_date), time_to_check)
                        }

                        console.log(first_date, first_check_date, second_date, second_check_date, third_date, third_check_date)
                        first_date_formatted = date_render(first_date)
                        second_date_formatted = date_render(second_date)
                        third_date_formatted = date_render(third_date)
                        console.log(first_date_formatted, first_check_date, second_date_formatted, second_check_date, third_date_formatted, third_check_date)
                        first_date = format_month(first_date)
                        second_date = format_month(second_date)
                        third_date = format_month(third_date)

                        date_dict[first_check_date] = first_date_formatted
                        date_dict[second_check_date] = second_date_formatted
                        date_dict[third_check_date] = third_date_formatted
                        populate_dates(date_dict)
                        console.log("render_future_dates over")

                        function format_month(date){
                            var year = date.getFullYear()
                            var month = date.getMonth() + 1
                            var date = date.getDate()
                            if (date.toString().length === 1)  {
                                date = "0" + date
                            }
                            if (month.toString().length === 1)  {
                                month = "0" + month
                            }
                            return year + "-" + month + "-" + date 
                            
                        }

                        function check_date(month_formatted, selected_time){
                            var check_date = month_formatted + "T" + selected_time + "-05:00"
                            check_date = new Date(check_date).toISOString()
                            return check_date
                        }

                        function already_booked(date, used_dates){
                            for (var i = 0; i < used_dates.length; i++){
                                if (date === used_dates[i]){
                                    return true
                                } 
                            }

                            return false
                        }

                                                

                    }

                    function date_render(date){
                        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
                        var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        var day_name = days[date.getDay()]
                        var month = months[date.getMonth()]
                        var day = date. getDate()
                        var year = date.getFullYear()
                        return day_name + ", " + month + " " + day + ", " + year
                    }

                    function populate_dates(date_dict){

                        $("#date1-" + id).find('option').remove().end()
                        for (var key in date_dict){
                            console.log(key, date_dict[key])
                            $("#date1-" + id).append(new Option(date_dict[key], key))
                            
                        }
                        console.log("populate_dates over")
                    }                 

                    function to_24hr(time){
                        var time_split = time.split(" ")
                        var hr_date_format
                        var hr
                        var min
                        var sec = "00"
                        //console.log(time_split[0], time_split[0].length, time_split[0][0],  time_split[0][1])
                        if (time_split[0].length === 1 ){
                                hr = "0"+ time_split[0]
                                min = "00"
                            } else if (time_split[0].length === 2){
                                hr = time_split[0]
                                min = "00"
                            } else if (time_split[0].length === 4){
                                var split = time_split[0].split(":")
                                hr = "0" + split[0]
                                min = split[1]
                            
                            } else if (time_split[0].length === 5){
                                var split = time_split[0].split(":")
                                hr = split[0]
                                min = split[1]
                            }
                        if (time_split[1] === "p.m." && parseInt(hr) != 12) {
                            hr = (parseInt(hr) + 12).toString()
                        }

                        return hr + ":" + min + ":" + sec

                    }

                    function friend() {
                        console.log("friends")
                        $(".friend-button").click(function() {
                            console.log('click')
                            
                            if (friend_drop === false){
                                console.log(false, $("#friend-down-" + id), $("#friend-up-" + id))
                                $("#friend-down-" + id).hide()
                                $("#friend-up-" + id).show()
                                friend_drop = true

                            } else {
                                console.log(true,  $("#friend-up-" + id), $("#friend-down-" + id))
                                $("#friend-down-" + id).show()
                                $("#friend-up-" + id).hide()
                                friend_drop = false

                            }
                        })

                    }

                    function check_form_input(student_email, parent_email){
                        if (student_email.trim() === parent_email.trim()){
                            return true
                        } else {
                            return false
                        }
                    }

                    });

                });

                    
                 
                })
                    


                
            }


            

            function addDays (date, days) {
                var date = new Date(date)
                date.setDate(date.getDate() + days);
                return date;
            }

            function addMinutes(date, minutes) {
                var date = new Date(date)
                return new Date(date.getTime() + minutes*60000);
            }

            function addWeeks (date, weeks) {
                var date = new Date(date);
                date.setDate(date.getDate() + weeks * 7);
                return date;
            }

            function contains(obj, array){  //lol datastructures such a O^2 implemenation very bad
                for (var i=0; i < array.length; i++){
                    if (obj === array[i]){
                        return true;
                    }
                }
                return false;
            }


            function paginator_generator(){
                $('#pagination').empty()
                console.log("start_pagination")
                //$('#pagination').append('<li class="page-item"><a class="page-link" id = "previous" href="#">Previous</a></li>')    
                if (current_show.length/paginator_count === 0){
                    alert("Apologies! Right now we don't have any mentors matching your search, but we're hard at work bring so this doesn't happen again. Try searching with different filters - don't forget to invite a friend to the conversation 😁 Hope you have a great day 🤩")
                }
                for (var i = 0; i < Math.ceil(current_show.length/paginator_count); i++){
                    $('#pagination').append('<li class="page-item"><a id = "page-' + (i+1) + '"' +  'class="page-link" href="#">' + (i+1) + '</a></li>')
                }
                //$('#pagination').append('<li class="page-item"><a class="page-link" id = "next" href="#">Next</a></li>')
                $('#page-1').parent().addClass('active')
                show(1)
                $(".page-link").click(function (){
                    var new_number = parseInt(($(this).attr('id').split("-"))[1])                    
                    $(".active").first().removeClass('active')
                    $(this).parent().addClass("active") 
                    show(new_number)
                               

                })

                function show(number){
                    var number_to_show_end = number * paginator_count
                    var number_to_show_start = number_to_show_end - paginator_count
                    for (var i = 0 ;i < current_show.length; i++){
                        if (i >= number_to_show_start && i < number_to_show_end){
                            current_show[i].attr('style','display:block !important')
                        } else {
                            // var parent = current_show[i].parent()
                            // var element = current_show[i]
                            // console.log("show", parent)
                            // current_show[i].remove()
                            // console.log(current_show[i], )
                            // console.log(element, "hkf")
                            // parent.append(element)
                            // current_show[i].removeClass("col-3")
                            // current_show[i].removeClass("col-0")
                            current_show[i].attr('style','display:none !important')
                        }
                    }
                }



            }
            function run(){
                current_show = []
                var colleges = $("#colleges").val()
                var year = $("#grad").val()
                var major = $("#majors").val()
                var home = $("#home").val()
                var interests = $("#interests").val()
                var school = $("#highschool").val()

                
                $(".comp-info").each( function(index){
                    var info = ($(this).html()).trim().split(" ")
                    console.log(colleges, year, major, home, interests, school)
                    console.log("hi", $(this).parent().parent())
                    $(this).parent().parent().attr('style','display:none !important')
                    if (contains(colleges, info) && contains(year, info) && contains(major, info) && contains(major, info) && contains(interests, info)&& contains(school, info) && contains(home, info)){
                        $(this).parent().parent().attr('style','display:block !important')                 
                        current_show.push($(this).parent().parent())
                    }            

               })
            }







        })