// // khoi tao map rong
// const myMap = new Map();

// // them pham tu vao mang
// myMap.set(key, value);

// // lay gia tri cua phan tu
// const value = myMap.get(key);

// // xoa phan tu
// myMap.delete(key);

// // xoa tat ca phan tu
// myMap.clear();

// // kiem tra phan tu co ton tai hay khong

// const hasKey = myMap.has(key);

// // duyet qua tat ca phan tu trong map
// for (const [key, value] of myMap.entries()) {
//   // xu ly key va value
// }

// // duyet qua cac khoa

// for (const key of myMap.keys()) {
//   const value = myMap.get(key);
// }

// // duyet qua cac gia tri

// for (const value of myMap.values()) {
//   const key = myMap.keys();
// }

// // example
// const arr = [1, 2, 3, 2, 1, 4, 5, 1];
// const frequencyMap = new Map();

// for (const num of arr) {
//   const currentFrequency = frequencyMap.get(num) || 0;
//   frequencyMap.set(num, currentFrequency + 1);
// }

// for (const [num, frequency] of frequencyMap.entries()) {
//   console.log(`${num} appears ${frequency} times`);
// }

// function findTwoSum(nums, target) {
//   const numsMap = new Map();
//   for (let i = 0; i < nums.length; i++) {
//     const complement = target - nums[i];
//     if (numsMap.has(complement)) {
//       console.log([numsMap.get(complement)]);
//       return [numsMap.get(complement), i];
//     }
//     numsMap.set(nums[i], i);
//   }
//   return [];
// }

// const nums = [11, 15, 2, 7];
// const target = 9;
// const result = findTwoSum(nums, target);

// function groupAnagrams(words) {
//   const anagramGroup = new Map();
//   for (const word of words) {
//     const sortedWord = word.split("").sort().join("");
//     if (!anagramGroup.has(sortedWord)) {
//       anagramGroup.set(sortedWord, []);
//     }
//     anagramGroup.get(sortedWord).push(word);
//   }
//   return Array.from(anagramGroup.values());
// }

// const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
// const result = groupAnagrams(words);

// function isAnagram(word1, word2) {
//   const charMap = new Map();
//   for (const char of word1) {
//     console.log(char);
//     charMap.set(char, (charMap.get(char) || 0) + 1);
//     console.log(charMap);
//   }

//   console.log(charMap);
//   console.log("____________________");
//   for (const char of word2) {
//     console.log(char);
//     if (!charMap.has(char) || charMap.get(char) === 0) {
//       console.log(charMap);
//       return false;
//     }
//     charMap.set(char, charMap.get(char) - 1);
//     console.log(charMap);
//   }
//   return true;
// }

// const word1 = "listen";
// const word2 = "silenti";
// const isAnagramResult = isAnagram(word1, word2);
// console.log(isAnagramResult);

// function findDuplicate(nums) {
//   const numsMap = new Map();

//   for (const num of nums) {
//     if (numsMap.has(num)) {
//       return num;
//     }

//     numsMap.set(num, true);
//   }

//   return -1;
// }

// function findDifferenceNumbers(nums, target) {
//   const numsMap = new Map();

//   for (let i = 0; i < nums.length; i++) {
//     const complement = target - nums[i];

//     if (numsMap.has(complement)) {
//       return [complement, nums[i]];
//     }

//     numsMap.set(nums[i], i);
//   }

//   return [];
// }

/* -----------------------------------*/

// // selection sort

// function selectionSort(arr) {
//   const n = arr.length;
//   for (let i = 0; i < n; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < n; j++) {
//       if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }
//     [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
//   }
//   return arr;
// }

// // Ví dụ sử dụng
// const unsortedArray = [64, 25, 12, 22, 11];
// console.log("Mảng ban đầu:", unsortedArray);

// const sortedArray = selectionSort(unsortedArray);
// console.log("Mảng sau khi sắp xếp:", sortedArray);

// function quickSort(arr) {
//   if (arr.length <= 1) {
//     return arr;
//   }

//   const pivot = arr[arr.length - 1];
//   const leftArr = [];
//   const rightArr = [];

//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] < pivot) {
//       leftArr.push(arr[i]);
//     } else {
//       rightArr.push(arr[i]);
//     }
//   }

//   return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
// }

// const unsortedArray = [64, 25, 12, 22, 11];
// console.log("Mảng ban đầu:", unsortedArray);

// const sortedArray = quickSort(unsortedArray);
// console.log("Mảng sau khi sắp xếp:", sortedArray);
