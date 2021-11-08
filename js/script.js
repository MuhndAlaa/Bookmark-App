var websiteName = document.getElementById("websiteName");
var websiteUrl = document.getElementById("websiteUrl");
var websiteName2 = document.getElementById("websiteName-2");
var websiteUrl2 = document.getElementById("websiteUrl-2");
var mainBtn = document.getElementById("mainBtn");
var bookmarks = [];

if(localStorage.getItem("bookmarks") == null)
{
    bookmarks = [];
}
else
{
    bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark();
}

function addBookmark()
{
    var website = {
        name : websiteName.value ,
        url : websiteUrl.value 
    }

    bookmarks.push(website);
    clearForm();
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    displayBookmark();
}

function clearForm()
{
    websiteName.value="";
    websiteUrl.value="";
}

function displayBookmark()
{
    var tableRow=``;
    for(var i=0;i<bookmarks.length;i++)
    {
        tableRow+=`
        <tr>
            <td class="font-weight-bold">`+bookmarks[i].name+`</td>
            <td class="text-right">
            <a class="btn btn-primary" href="https://`+bookmarks[i].url+`" role="button" target="_blank" data-placement="top" title="Go to link"><i class="fas fa-external-link-alt"></i></a>
                <button onclick="modifyBookmark(`+i+`)" class="btn btn-warning" data-placement="top" title="Modify"><i class="fas fa-edit"></i></button>
                <button onclick="deleteBookmark(`+i+`)" class="btn btn-danger" data-placement="top" title="Delete"><i class="far fa-minus-square"></i></button>
            </td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML=tableRow;

}

function deleteBookmark(bookmarkIndex)
{
    bookmarks.splice(bookmarkIndex,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    displayBookmark();
}

function modifyBookmark(bookmarkIndex)
{
    websiteName.value = bookmarks[bookmarkIndex].name;
    websiteUrl.value = bookmarks[bookmarkIndex].url;
    mainBtn.innerHTML=`<button id="mainBtn" class="btn btn btn-warning" onclick="updateBookmark(`+bookmarkIndex+`);">Modify Bookmark</button>`
}

function updateBookmark(bookmarkIndex)
{
    bookmarks[bookmarkIndex].name = websiteName.value;
    bookmarks[bookmarkIndex].url = websiteUrl.value;
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    displayBookmark();
    clearForm();
    mainBtn.innerHTML=`<button class="btn btn-success" onclick="addBookmark();"> + Add Bookmark</button>`
}

function searchBookmark(searchItem)
{
    var tableRow=``;
    for( var i=0 ; i < bookmarks.length ; i++)
    {
        if(bookmarks[i].name.toLowerCase().includes(searchItem.toLowerCase()))
        {

        tableRow+=`
        <tr>
            <td class="font-weight-bold">`+bookmarks[i].name+`</td>
            <td class="text-right">
            <a class="btn btn-success" href="https://`+bookmarks[i].url+`" role="button" target="_blank">GoTo</a>
                <button onclick="modifyBookmark(`+i+`)" class="btn btn-warning">modify</button>
                <button onclick="deleteBookmark(`+i+`)" class="btn btn-danger">delete</button>
            </td>
        </tr>`

        }
    }
    document.getElementById("tableBody").innerHTML=tableRow;
}
