#include<bits/stdc++.h>
using namespace std;
class LRUCache {
public:
    map<int,int> mymap;
    list<int> ls;
    int cp;
    LRUCache(int capacity) {
        cp = capacity;
        mymap.clear();
        ls.clear();
    }
    
    int get(int key) {
        if(mymap.find(key) == mymap.end()) return -1;
        ls.remove(key);
        ls.push_front(key);
        return mymap[key];
    }
    
    void put(int key, int value) {
        if(mymap.find(key) == mymap.end()){
            if(ls.size() == cp){
                /// full
                int last = ls.back();
                ls.pop_back();
                mymap.erase(last);
            }
            mymap[key] = value;
            ls.push_front(key);
            
        }else{
            ls.remove(key);
            ls.push_front(key);
            mymap[key] = value;
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */

 #include <bits/stdc++.h>
using namespace std;
#define R 100
#define C 100
// function to print the
// required traversal
void Anticlock_pattern(int m,
							int n,
							int arr[R][C])
{
	int i, k = 0, l = 0;

	// k - starting row index
	// m - ending row index
	// l - starting column index
	// n - ending column index
	// i - iterator

	// initialize the count
	int cnt = 0;

	// total number of
	// elements
	int total = m * n;

	while (k < m && l < n)
	{
		if (cnt == total)
			break;

		// the first column
		// from the remaining columns
		for (i = k; i < m; ++i)
		{
			cout << arr[i][l] << " ";
			cnt++;
		}
		l++;

		if (cnt == total)
			break;

		// the last row from
		// the remaining rows
		for (i = l; i < n; ++i)
		{
			cout << arr[m - 1][i] << " ";
			cnt++;
		}
		m--;

		if (cnt == total)
			break;

		//  the last column
		// from the remaining columns
		if (k < m)
		{
			for (i = m - 1; i >= k; --i)
			{
				cout << arr[i][n - 1] << " ";
				cnt++;
			}
			n--;
		}

		if (cnt == total)
			break;

		//  the first row
		// from the remaining rows
		if (l < n)
		{
			for (i = n - 1; i >= l; --i)
			{
				cout << arr[k][i] << " ";
				cnt++;
			}
			k++;
		}
	}
}