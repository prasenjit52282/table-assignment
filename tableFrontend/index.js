// read from backend
async function getData(url = '') {
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
    });
    const result= await response.json();
    return result;
}

//delete from backend
async function deleteById(url = '', id=null) {
    const response = await fetch(url+'/'+id, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    });
}



//Write table in the DOM from the data
const writetableinDOM=async (data,writegenderlogo=flase)=>{
        let myrows=data;
        let keys=Object.keys(data[0]);

        //table Header Creation from Backend
        //forming the start template for header
        let headtemplate=`<tr>
                        <th scope="col"><input type="checkbox" id="selectAll" /></th>`
        //keys[0] is id so it is skipped
        for(let i=1;i<keys.length;i++){
            //adding keys as columns of the table
            headtemplate+=`<th scope="col">${capitalizeFirstLetter(keys[i])}</th>`;
        }
        //closing the header tr
        headtemplate+=`</tr>`
        //appending as a child of table header
        $("#mytable thead").append(headtemplate);

        //table Body Creation from Backend
        for(let i=0;i<myrows.length;i++){
            //forming the start template for body
            let template=`<tr>
                            <th scope="row" class="identity">
                            <span class="omit">${myrows[i][keys[0]]}</span>
                            <input type="checkbox" disabled="disabled"/>
                            </th>`;

            //keys[0] is id so skipped
            for(let j=1;j<keys.length;j++){
                //adding data as td value of the table emtry
                if (keys[j]=="name" && writegenderlogo==true){
                    // for name add its logo
                    let genderlogo=await getEmgiFromName(myrows[i][keys[j]]);
                    template+=`<td>${genderlogo+' '+myrows[i][keys[j]]}</td>`;
                }else{
                template+=`<td>${myrows[i][keys[j]]}</td>`;
                }
            }
            //closing the body tr
            template+=`</tr>`
            //appending as a child of table body
            $("#mytable tbody").append(template);
        }
    }


//Initilizing DataTable object
const initilizeTable=()=>
    {
        // dom:
        // l - Length changing
        // f - Filtering input
        // t - The Table!
        // i - Information
        // p - Pagination
        // r - pRocessing

        //Init table Controls
        var table=$('#mytable').DataTable({
            "lengthMenu": [[10, 20,30,-1], [10, 20,30,"All"]],
            "pagingType":"full_numbers",
            "dom": '<"top"if>rt<"bottom"lp><"clear">',
            "columnDefs": [{ "orderable": false, "targets": 0 }],
            "order": [[1, 'asc']],
            "language": {
                "paginate": {
                "previous": '<i class="fas fa-chevron-left"></i>',
                "next": '<i class="fas fa-chevron-right"></i>',
                "first":'<i class="fas fa-angle-double-left"></i>',
                "last":'<i class="fas fa-angle-double-right"></i>' 
                }
            }
        });

        //logic --seleting multiple rows by body clicks
        $('#mytable tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
            let chkbox=$(this).find(".identity").find("input").toArray()[0];
            // chkbox.attr("checked", !chkbox.attr("checked"));
            if(chkbox.checked==true){
                chkbox.checked=false;
            }else{
                chkbox.checked=true;
            }
            // console.log(chkbox);
            });


        //delete row in DELETE keydown event
        $("body").on("keydown" ,(event)=>{
            if(event.key=="Delete"){
                deleteSelected(100); //annimate for 100ms
            }
        });

        //Delete from DOM & Server
        function deleteSelected(delay){
            $(".selected").fadeOut(delay, ()=>table.rows('.selected').remove().draw( false ));
            $(".selected .identity").toArray().forEach(e=>deleteById(resource_url,e.innerText.trim()));
            //have to trim the innerHTML as it " text" so getting error in backend "%20text" is passed so we trim()
        }
    }

//adding select all capibility to the selectAll checkbox in table header
const addSelectAllCapability=()=>{
        $("#selectAll").on("click", ()=>{
            $("#selectAll").attr("checked",!$("#selectAll").attr("checked"));

            let state=new Boolean($("#selectAll").attr("checked"));
            // console.log(state);
            if(state==true){
                let checkboxes=$(".identity input").toArray();
                checkboxes.forEach(e=>e.checked=true);
                //select all rows
                let all_rows=$("tbody tr"); //visiable rows
                all_rows.addClass('selected'); //select
            }else{
                let checkboxes=$(".identity input").toArray();
                checkboxes.forEach(e=>e.checked=false);
                //select all rows
                let all_rows=$("tbody tr"); //visiable rows
                all_rows.removeClass('selected'); //select
            }
            
        });
    }

//Capatalize Strings --used to Capatalize header strings
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//get gender logo from name
const getEmgiFromName=async (name)=>{
    let data= await fetch("https://gender-api.com/get?key=eEJWXGASnAXBFfsgWM&name="+name).then(e=>e.json()).catch(err=>console.log(err));
    let gender =data.gender;
    if(gender=="male"){
        return `<i class="male fas fa-male"></i>`
    }else if(gender=="female"){
        return `<i class="female fas fa-female"></i>`
    }else{
        return `<i class="not-found fas fa-exclamation-triangle"></i>`
    }
}


///////////MAIN PROGRAM//////////////////

// drawing the table in the DOM with pagation & select & delete Capability
const resource_url="http://127.0.0.1:5000/employee"
let writegenderlogo=false

getData(resource_url)
.then((data)=>writetableinDOM(data,writegenderlogo)) //write table in DOM with the data
.then(()=>initilizeTable()) //initilize table with dataTables API
.then(()=>addSelectAllCapability()) //add select all capability in the selectAll checkbox
.catch(err=>console.log("Error"+err)); //lockout for any error