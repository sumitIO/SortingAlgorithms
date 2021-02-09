var arr = [97,3,56,24,15,67,8,29,0,12]
var sortingMethod
var numberOfSwap = 0

var extra = null
var createKeyElement
var showKey

function createKeyElementFunction(){
    if (extra == null){
        extra = document.querySelector('.extra')
        createKeyElement = document.createElement('div')
        createKeyElement.setAttribute('class', 'default') 
        extra.appendChild(createKeyElement)
    }
    showKey = createKeyElement
}


// QUERY SELECTORS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var arrayIndex = document.querySelector('.index')
var arrayBlock = document.querySelector('.wrapper')
var inputLength = document.querySelector('#length')
var speed = document.querySelector('#speed')
var incButton = document.querySelector('.increment')
var decButton = document.querySelector('.decrement')
var speedIncButton = document.querySelector('.speed-increment')
var speedDecButton = document.querySelector('.speed-decrement')
var swapDisplay = document.querySelector('.swap')
var TimeComplexDisplay = document.querySelector('.time-comp')
    
// sortting type
var sortTypeOption = document.querySelector('#sort-menu');
// sorting button
var sortButton = document.querySelector('.sort-btn')

var showArrayLenth = document.querySelector('#value')
showArrayLenth.innerHTML = inputLength.value

var showSpeed = document.querySelector('#speed-value')
showSpeed.innerHTML = speed.value
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


// EVENT LISTENERS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    inputLength.addEventListener('change',()=>{
        updateArrayHandler(inputLength.value)
    })
    // ArraySize Increse
    incButton.addEventListener('click', ()=>{
        inputLength.value++;
        showArrayLenth.textContent = inputLength.value
        addElementHandler(inputLength.value)
    })
    // ArraySize Decrease
    decButton.addEventListener('click', ()=>{
        inputLength.value--;
        showArrayLenth.textContent = inputLength.value
        removeElementHandler(inputLength.value)
    })
    // 
    speed.addEventListener('change',()=>{
        showSpeed.innerHTML = speed.value
    })
    // Speed Increse
    speedIncButton.addEventListener('click', ()=>{
        speed.value = speed.value + 100
        showSpeed.innerHTML = speed.value
    })
    // Speed Decrease
    speedDecButton.addEventListener('click', ()=>{
        speed.value -=100;
        showSpeed.innerHTML = speed.value
    })
    // 
    sortTypeOption.addEventListener('change', ()=>{
        
        if(sortTypeOption.value === 'bubble'){
            TimeComplexDisplay.textContent = 'O(n2)'
        }

        if(sortTypeOption.value === 'insertion'){
            TimeComplexDisplay.textContent = 'O(n2)'
            createKeyElementFunction()
        }
        sortingMethod = sortTypeOption.value
    })
    // 
    sortButton.addEventListener('click', sortHandler)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Event Handlers
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function removeElementHandler(size){
        var i = arr.length - size
        while(i){
            arr.pop()
            i--
            arrayBlock.removeChild(arrayBlock.lastElementChild)
            arrayIndex.removeChild(arrayIndex.lastElementChild)
        }
        console.log(arr)
    }
function addElementHandler(size){
    var i = size - arr.length
    while(i){
            arr.push( Math.floor(Math.random()*100))
            // create divs for array-index and array-value
            var indexBlock = document.createElement('div')
            var block = document.createElement('div')
            
            // attach class to index-blocks
            indexBlock.setAttribute('class', 'index-block')
            indexBlock.setAttribute('id', arr.length-1)
            indexBlock.textContent = arr.length-1
                
            // attach class to array-blocks
            block.classList.add('default')
            block.setAttribute('id', arr.length-1)
            block.textContent = arr[arr.length-1]
                
            // append childs to render
            arrayBlock.appendChild(block)
            arrayIndex.appendChild(indexBlock)        
            i--
    }
}
function updateArrayHandler(size){
    removePreviousBlocks()
    for(var i=0;i<size;i++){
        // fill array with random number
        arr[i] = Math.floor(Math.random()*100)
        // create divs for array-index and array-value
        var indexBlock = document.createElement('div')
        var block = document.createElement('div')
        
        // attach class to index-blocks
        indexBlock.setAttribute('class', 'index-block')
        indexBlock.setAttribute('id', i)
        indexBlock.textContent = i
            
        // attach class to array-blocks
        block.classList.add('default')
        block.setAttribute('id', i)
        block.textContent = arr[i]
            
        // append childs to render
        arrayBlock.appendChild(block)
        arrayIndex.appendChild(indexBlock)
    }
    showArrayLenth.innerHTML = inputLength.value
}

function sortHandler(){
    numberOfSwap = 0
    // freeze sort Button to avoid overflow
    // freeze array size increase button
    // freeze array size decrease button
    toggleFreeze(true)    
    swapDisplay.textContent = numberOfSwap

    if(sortingMethod === 'Choose...'){
        toggleFreeze(false)
    }
    if(sortingMethod === 'bubble'){
        BubbleSort()
    }
    if(sortingMethod === 'insertion'){
        console.log('insertion')
        InsertionSort()
    }
    else{
        console.log(sortingMethod)
        
    }
}   
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SORTING FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function BubbleSort(){
    var i=0, j=0;
    for(i=0;i<arr.length-1;i++){
        for(j=0;j<arr.length-i-1;j++){
            // toggle current & next CSS Style Class
            toggleCurrentArrayElementClass(j);
            toggleCurrentArrayElementClass(j+1)
            // Sleep to Animate
            await sleep(speed.value)
            if (arr[j] > arr[j+1]){
                numberOfSwap++;
                swapDisplay.textContent = numberOfSwap;
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                swapArrayBlockBubbleSort(j);
                // Sleep to Animate
                await sleep(speed.value)   
            }
            // toggle current & next CSS Style Class
            toggleCurrentArrayElementClass(j)
            toggleCurrentArrayElementClass(j+1);
        }
        var sortedfromLast = arr.length-i-1
        // toggle CSS Style Class of sorted Element
        toggleCurrentArrayElementClass(sortedfromLast)
    }
    // toggle CSS Style Class of arr[0]
    toggleCurrentArrayElementClass(0)
    // Animate when Sorting Completes
    sortFinshAnimate()
}
async function InsertionSort(){
    var i, key, j;  
    for (i = 1; i < arr.length; i++) 
    {  
        key = arr[i];
        toggleCurrentArrayElementClass_InsertionSort(i,'current-key')
        await sleep(speed.value)
        j = i - 1;  
        while (j >= 0 && arr[j] > key){ 
            numberOfSwap++;
            swapDisplay.textContent = numberOfSwap;
            arr[j + 1] = arr[j];
            animateInsertionEffect(j)
            await sleep(speed.value)
            resortClass(j)
            resortClass(j+1)
            await sleep(speed.value)
            arrayBlock.children[j+1].innerText = arr[j]
            j = j - 1;  
        }
        arr[j + 1] = key;
        arrayBlock.children[j+1].innerText = key
    }
    sortFinshAnimate()  
} 


// ANIMATTION FUNCTION FOR INSEERTION SORT
function resortClass(idx){
    arrayBlock.children[idx].className ='sorted-element'
}
function animateInsertionEffect(idx){
    // remove all previous classes 
    for(var i = 0; i< idx; i++){
        arrayBlock.children[i].classList = 'sorted-element'
    }
    arrayBlock.children[idx].classList.add('move-right')
    arrayBlock.children[idx+1].classList.add('move-left')
}
function toggleCurrentArrayElementClass_InsertionSort(index,c){
    if(arrayBlock.children[index].className === 'default'){
        arrayBlock.children[index].className = c
        // empty the block text
        arrayBlock.children[index].innerText = ''        
        showKey.className = 'key'
        showKey.innerText = arr[index]  
    }
    else{
        arrayBlock.children[index].className = 'default'
        showKey.className = 'default'
    }
}


// HELPER FUNCTIONS
// Clear the Array
function removePreviousBlocks(){
    while(arr.length !=0){
            arr.pop()
    }
    while(arrayBlock.hasChildNodes()){
        arrayBlock.removeChild(arrayBlock.lastChild)
        arrayIndex.removeChild(arrayIndex.lastChild)
    }        
}
// print array to console
function printArray(){
    console.log(arr)
}

// function to block wait
const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// function to animate at the end of sorting
function sortFinshAnimate(){
    for(var i = 0;i<arrayBlock.length;i++){
        arrayBlock.children[i].classList = ['sorted-element']
    }
    var counter = 0;
    var timer = setInterval(()=>{
        for(var i =0 ;i<arr.length;i++){ 
            toggleCurrentArrayElementClass(i)
        }
        counter++;
        if(counter ===5){
            clearInterval(timer)
        }
    },500)
    // unfreeze button once sorting is completed
    toggleFreeze(false)
}

// Toggle function 
function toggleFreeze(freeze){
    if(freeze){
        inputLength.disabled = true
        incButton.disabled = true
        decButton.disabled = true
        sortButton.disabled = true
        sortTypeOption.disabled = true
    }
    else{
        inputLength.disabled = false
        incButton.disabled = false
        decButton.disabled = false
        sortButton.disabled = false
        sortTypeOption.disabled = false
    }
}


// Helper function for Bubble Sort
function toggleCurrentArrayElementClass(index){
    if(arrayBlock.children[index].className === 'default'){
        arrayBlock.children[index].className = 'sorted-element'
    }else{
        arrayBlock.children[index].className = 'default'
}
}
// Helper function for Bubble Sort
function swapArrayBlockBubbleSort(index){
    // Animate block to left
    arrayBlock.children[index+1].classList.add('move-left-bubble')
    // Animate block to right
    arrayBlock.children[index].classList.add('move-right-bubble')
    // Swap Display 
    arrayBlock.children[index].innerText = arr[index]
    arrayBlock.children[index+1].innerText = arr[index+1]                
}