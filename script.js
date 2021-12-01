var library = [];

function Book(title,author,pageNum,read){
    this.title = title
    this.author = author
    this.pageNum = pageNum
    this.read = read
};

function addBookToLib(title,author,pageNum,read){
    library.push(new Book(title,author,pageNum,read))
};

// eliminar libro de html y lista
function deleteBook(bookTitle,array){
    document.getElementById(`${bookTitle}`).remove()
    var findIndex = array.findIndex((book) => (book.title) == bookTitle);
    delete array[findIndex]
};

function libToHtml(array){

    array.forEach(function(book) {

        if (!document.getElementById(`${book.title}`)) {
            cardCreator(book.title,book.author,book.pageNum)
        }
    })
};

function cardCreator(titlee,authorr,pageNum){
    var cardContainer=document.getElementById("cardContainer")
            
            var div = document.createElement('div');
            div.setAttribute("class","card")
            div.setAttribute("id",`${titlee}`)
            
            var title = document.createElement("p")
            title.innerHTML =`Title: ${titlee}.`
            
            var author = document.createElement("p")
            author.innerHTML =`Author: ${authorr}.`
           
            var numOfPages = document.createElement("p")
            numOfPages.innerHTML = `Number of pages:${pageNum}.`
            
            var checkBoxCont = document.createElement("p")
            var checkBox = document.createElement("input")
            checkBox.className ="checkbox"
            checkBox.type ="checkbox"
            var label = document.createElement("label")
            label.htmlFor ="checkbox"
            label.innerHTML =`Read: `

            var delBut = document.createElement("button")
            delBut.className = "delBut"
            delBut.innerHTML = "Delete"

            cardContainer.appendChild(div)
            div.appendChild(title)
            div.appendChild(author)
            div.appendChild(numOfPages)
            div.appendChild(checkBoxCont)
            checkBoxCont.appendChild(label)
            checkBoxCont.appendChild(checkBox)
            div.appendChild(delBut)

};

function delButtonsOnClick(){
    var delButs = document.querySelectorAll(".delBut");
    delButs.forEach(function (e){
        e.onclick = function(){
            deleteBook(this.parentElement.id,library)
        }
    })
};
delButtonsOnClick()

function addBookButtonOnClick(){
    var addButton = document.querySelector(".addBut")
    addButton.onclick =function(){
        var modal = document.querySelector(".bg-modal")
        modal.style.display ="flex"
    }
}
addBookButtonOnClick()

function addCloseButtonOnClick(){
    var closeButton = document.querySelector(".close")
    closeButton.addEventListener("click",function(){
        var modal = document.querySelector(".bg-modal")
        modal.style.display ="none"
        inputBackToNormal()
    })
}
addCloseButtonOnClick()

function addAddButtonOnClick(){
    var addBut = document.querySelector(".modal-but")
    addBut.onclick = function(){
        var nameInput = document.querySelector("#book-name")
        var authorInput = document.querySelector("#book-author")
        var pagesInput = document.querySelector("#book-pages")
        if(isNaN(pagesInput.value)){
            pagesInput.style.border = "4px solid #ff0000"
        }
        else{
            addBookToLib(nameInput.value,authorInput.value,pagesInput.value,false)
            libToHtml(library)
            var modal = document.querySelector(".bg-modal")
            modal.style.display ="none"
            inputBackToNormal()
            delButtonsOnClick()
            addCheckBoxOnClick()
        }
    }
}
addAddButtonOnClick()

function inputBackToNormal(){
    var nameInput = document.querySelector("#book-name")
    var authorInput = document.querySelector("#book-author")
    var pagesInput = document.querySelector("#book-pages")
    pagesInput.style.border = "2px solid #EA5455"
    nameInput.value = ""
    authorInput.value = ""
    pagesInput.value = ""
    nameInput.placeholder = "Title"
    authorInput.placeholder = "Author"
    pagesInput.placeholder = "Number of pages"

}

function addCheckBoxOnClick(){
    var checkBoxes = document.querySelectorAll(".checkbox")
    checkBoxes.forEach (function (e){
        e.onclick = function(){
            if(e.checked){
                changeReadStatus((this.parentElement).parentElement.id,library,true)
            }
            else{
                changeReadStatus((this.parentElement).parentElement.id,library,false)
                
            }
        }
    })
}

addCheckBoxOnClick()

function changeReadStatus(bookTitle,array,status){
     var findBook = array.find((book) => (book.title) == bookTitle)
     findBook.read = status
}
