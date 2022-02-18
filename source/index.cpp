#include <bits/stdc++.h>
#include <stdlib.h>
#include <time.h>
using namespace std;

// A utility function to swap to integers
void swap(int *a, int *b)
{
  int temp = *a;
  *a = *b;
  *b = temp;
}

// A utility function to print an array
void printArray(int arr[], int n)
{
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  cout << "\n";
}

// A function to generate a random
// permutation of arr[]
void randomize(int arr[], int n)
{
  // Use a different seed value so that
  // we don't get same result each time
  // we run this program
  srand(time(NULL));

  // Start from the last element and swap
  // one by one. We don't need to run for
  // the first element that's why i > 0
  for (int i = n - 1; i > 0; i--)
  {
    // Pick a random index from 0 to i
    int j = rand() % (i + 1);

    // Swap arr[i] with the element
    // at random index
    swap(&arr[i], &arr[j]);
  }
}

// Driver Code
int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6, 7, 8};
  int n = sizeof(arr) / sizeof(arr[0]);
  randomize(arr, n);
  printArray(arr, n);

  return 0;
}

void duplicate(int arr[],int n){

   sort(arr,arr+n);
    
    int c = arr[0];
    int ct =0;
    for(int i=1;i<n;i++){
        if(arr[i] == c){
            ct++;
        }
        else{
            if(ct>0){
                cout<<c;
            }
            c = arr[i];
            ct = 0;
        }
    }
    if(ct > 0){
        cout<<c;
    }
}

void push(char);
char pop();
void main()
{
    char exp[MAX],temp;
    int i,flag=1;
    printf("Enter the Expression: ");
    gets(exp);
    for(i=0;i<strlen(exp);i++)
    {
        //checks for opening bracket and push it into stack
        if(exp[i]=='('||exp[i]=='['|| exp[i]=='{')
        {
            push(exp[i]);
        }
        //checks for closing brackets
        if(exp[i]==')'||exp[i]==']'|| exp[i]=='}')
        {
            if(top==-1)
            {
                flag=0;
            }
            else
            {
                temp=pop();
                if((exp[i]==')')&&(temp=='{'||temp=='['))
                {
                    flag=0;
                }
                if((exp[i]=='}')&&(temp=='('||temp=='['))
                {
                    flag=0;
                }
                if((exp[i]==']')&&(temp=='('||temp=='{'))
                {
                    flag=0;
                }
            }
        }
    }
    if(top>=0)
    {
        flag=0;
    }
    if(flag==1)
    {
        printf("\nValid Expression!");
    }
    else
    {
        printf("\nInvalid Expression!");
    }
} //main function terminates
void push(char c)
{
    if (top==(MAX-1))
    {
        printf("\nStack Overflow!");
    }
    else
    {
        top++;
        stack[top]=c;
    }
}
char pop()
{
    if(top==-1)
    {
        printf("\nStack Underflow!");
    }
    else
    {
        return(stack[top--]);
    }
}

stack<int>s1,s2;

void Enqueue(int n)
{
    while(!s1.empty())
    {
        s2.push(s1.top());
        s1.pop();
    }
    s1.push(n);
    while(!s2.empty())
    {
        s1.push(s2.top());
        s2.pop();
    }
}

void Dequeue()
{
    cout<<s1.top()<<endl;
    s1.pop();
}

int main()
{
    int n,i;
    cout<<"Enter the number digits to be added in queue : "<<endl;
    cin>>n;
    cout<<"Enter the digits : "<<endl;
    for(i=0;i<n;i++)
    {
        int num;
        cin>>num;
        Enqueue(num);
    }
    while(1)
    {
    cout<<"Press 1 to dequeue "<<endl;
    cin>>i;
    if(i==1)
    {
        Dequeue();
    }
    else{
        return 0;
    }
    }
}

#define size 10

int top = -1;
int stack[10];

void push(int item){
    if(top == (size -1)){
        printf("\n Warning..!!,Stack Overflown\n");
    }
    else{
        top++;
        stack[top] = item;
    }
}

int pop(){
    int item;
    if(top<0){
        printf("\nWarning..!!,Stack Underflow\n");
        return 0;
    }
    else{
        item = stack[top];
        top--;
        return item;
    }
}

void peek(){
    if(top--<0){
        printf("\nEmpty Stack\n");
    }
    else{
        printf("\nTop Element is Stack is: %d\n",stack[top]);
    }
}

void display(){
    int i = 0;
    printf("\nStack Elements are: \n");
    for(i=0;i<=top;i++){
        printf("%d\t",stack[i]);
    }
}


int main(){
    int n,in;
    
    printf("Menu Driven Program\n\n");
    printf("1 = Push,   2 = Pop,    3 = Peek,   4 = Display,    8 = Exit Program\n\n");
    printf("Enter Appropriate Options: ");
    scanf("%d",&n);
    printf("\n");
    
    while(1){
    switch(n){
        case (1):printf("\nEnter Input Elements for Stack: ");
            scanf("%d",&in);
            push(in);
            break;
        case (2):printf("\nElement Deleted: %d",pop());
            break;
        case (3):peek();
            break;
        case (4):display();
            break;
        case (8):exit(0);
        default:printf("\n\nNo/Incorrect Option Selected");break;
    }
    printf("\nEnter Appropriate Options: ");
    scanf("%d",&n);
    }
}

//utility function to fill random elements in an array
void fillRandom(vector<int>&);

//class for minHeap(INTERFACE)
class minHeap{
//private members
private:
    //heap array
    vector<int> heap;
    //heapify function returnType-void
    void heapify();
    //sift up function returnType-void
    void siftUp();
    //sift down function returnType-void
    void siftDown(int);

//public data members
public:
    //constructor returnType - None
    minHeap(vector<int>);
    //insert function returnType-void
    void insert(int);
    //remove function returnType-Int
    int remove();
    //function to get top element in the heap returnType-Int
    int getTop();
    //function to print heap returnType-void
    void printHeap();
};

//main function
int main(){
    //general array
    vector<int> array;
    //fill random elements in the array
    fillRandom(array);
    //create a heap object with the filled array
    minHeap* heap = new minHeap(array);
    
    //observe the actions done
    
    // heap->insert(33);
    // heap->remove();
    // cout<<heap->getTop<<endl;
    
    //end of the program
    return 0;
}

//constructor
minHeap::minHeap(vector<int> array){
    //assign the heap array member of the class with filled array
    heap = array;
    
    printHeap();
    
    //call the heapify method
    heapify();
    
    printHeap();
}

//heapify method
//generally changes the original skewed array to an array with heap property
void minHeap::heapify(){
    //observe the last child (definitely exists)
    int last_parent = heap.size()-2;
    //get the parent of the child
    last_parent /= 2;
    
    //iterate over the parents to the top parent and call siftdown on parents
    for(int node = last_parent ; node >= 0 ; node--){
        siftDown(node);
    }
}

//insert function
void minHeap::insert(int num){
    cout<<"Inserting -- "<<num<<endl;
    
    //push into the heap
    heap.push_back(num);
    //sift up on the last element
    siftUp();
    
    return;
}

//remove function
int minHeap::remove(){
    cout<<"Removing -- "<<endl;
    //get the first element
    int removed_num = heap[0];
    //swap with the last element
    swap(heap[0],heap[heap.size()-1]);
    //remove the last element
    heap.pop_back();
    //sift down from the root
    siftDown(0);

    return removed_num;
}

//printheap function
void minHeap::printHeap(){
    //range based for loop to print nums in heap
    for(auto num : heap){
        cout<<num<<" ";
    }
    cout<<endl;
}

//getTop function
int minHeap::getTop(){
    //if heap exists, return first element
    if(this->heap.size())
    return this->heap[0];
    //return the possible minimum element
    return INT_MIN;
}

//function which fills the array with random elements
void fillRandom(vector<int>& array){
    //time entity seeded to NULL, to get random elements every time
    srand(time(NULL));
    
    //fill the array with random elements
    for(int i = 0 ; i < 10 ; i++){
        array.push_back(1+rand()%100);
    }
}

//siftUp function
//     4     insertion        4     sift up             1
//    /    ----------->      / \   ------------>       / \ 
//   5                      5   1                     5   4
// the idea is on insert, we just want to sift up the last element (heap property holds)

void minHeap::siftUp(){
    //get the position of last element
    int last_element = heap.size()-1;
    int parent_index;
    
    //while thr position is valid
    while(last_element > 0){
        //find the parent element
        parent_index = last_element/2;
        //if the heap property doesn't hold
        //swap the elements such that heap property holds and continue iterating
        if(heap[parent_index] > heap[last_element]){
            swap(heap[parent_index],heap[last_element]);
            last_element = parent_index;
        //else break the loop and return
        } else break;
    }
    
    return;
}

//siftDown function
//     1    deletion(remove)         5         sift down             4
//    / \   --------------->        /      ----------------->       /
//   4   5                         4                               5
//the idea is to siftdown an element to bottom such that property holds
void minHeap::siftDown(int index){
    //given the index, get the children of the parent index
    int child_one = index*2+1;
    int child_two = index*2+2;
    int node_to_be_swapped = -1;
    
    //while children are valid(children exists)
    while(child_one < this->heap.size()){
        node_to_be_swapped = -1;
        //we can't say if second child exists based on first child, so conducting a check
        if(index*2+2 < this->heap.size()) child_two = index*2+2;
        else child_two = -1;
        
        //determining the node to be swapped
        //if child two exists and child two is smaller than child one, then node to be swapped is child two
        if(child_two != -1){
            //condition to hold the heap property
            if(heap[child_one] > heap[child_two]) node_to_be_swapped = child_two;
            else node_to_be_swapped = child_one;
        //else node to be swapped becomes child one itself
        } else node_to_be_swapped = child_one;
        
        //if it violates heap property, swap and update the index
        if(heap[node_to_be_swapped] < heap[index]){
            swap(heap[node_to_be_swapped],heap[index]);
            index = node_to_be_swapped;
            child_one = 2*index+1;
        } else child_one = heap.size();
    }
    
    return;
}

int bubble_sort(int arr[],int N){
	int i,j;
	int count=0;
	for(i=0;i<N;i++)
	{
		for(j=0;j<N-i-1;j++){
			if(arr[j]>arr[j+1]){
				swap(&arr[j],&arr[j+1]);
				count++;
			}
		}
	}
	return count;
}