###LEGACY CODE###

from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import os
from azure.search.documents import SearchClient
from dotenv import load_dotenv

load_dotenv()

# # Replace with your own values
# service_name = "your-search-service-name"
# index_name = "your-index-name"
# api_key = "your-api-key"

# # Create a SearchClient
# endpoint = f"https://{service_name}.search.windows.net/"
# credential = AzureKeyCredential(api_key)
# client = SearchClient(endpoint, index_name, credential)

# # Define your search query
# search_text = "your search query"
# results = client.search(search_text)

# # Access the retrieved data
# for result in results:
#     # Access fields in the result document
#     field_value = result["your_field_name"]
#     print(field_value)

endpoint = os.environ.get("ENDPOINT")
key = os.environ.get("APIKEY")

credential = AzureKeyCredential(key)
text_analytics_client = TextAnalyticsClient(endpoint=endpoint, credential=credential)

documents = ["""Generic Types
                In Java and many other programming languages, the mechanism to do this is called generics or templates. Java allows us to define a generic type that takes other types as type parameters, just like how we can write methods that take in variables as parameters.

                Declaring a Generic Type
                Let's see how we can do this for Pair:


                class Pair<S,T> {
                private S first;
                private T second;

                public Pair(S first, T second) {
                    this.first = first;
                    this.second = second;
                }

                S getFirst() {
                    return this.first;
                }

                T getSecond() {
                    return this.second;
                }
                }
                We declare a generic type by specifying its type parameters between < and > when we declare the type. By convention, we use a single capital letter to name each type parameter. These type parameters are scoped within the definition of the type. In the example above, we have a generic class Pair<S,T> (read "pair of S and T") with S and T as type parameters. We use S and T as the type of the fields first and second. We ensure that getFirst() returns type S and getSecond() returns type T, so that the compiler will give an error if we mix up the types.

                Note that the constructor is still declared as Pair (without the type parameters).

                Using/Instanting a Generic Type
                To use a generic type, we have to pass in type arguments, which itself can be a non-generic type, a generic type, or another type parameter that has been declared. Once a generic type is instantiated, it is called a parameterized type.

                To avoid potential human errors leading to ClassCastException in the example above, we can use the generic version of Pair as follows, taking in two non-generic types:


                Pair<String,Integer> foo() {
                return new Pair<String,Integer>("hello", 4);
                }

                Pair<String,Integer> p = foo();
                Integer i = (Integer) p.getFirst(); // compile-time error
                With the parameterized type Pair<String,Integer>, the return type of getFirst is bound to String, and the compiler now have enough type information to check and give us an error since we try to cast a String to an Integer.

                Note that we use Integer instead of int, since only reference types can be used as type arguments.

                Just like you can pass a parameter of a method to another method, we can pass the type parameter of a generic type to another:


                class DictEntry<T> extends Pair<String,T> {
                    :
                }
                We define a generic class called DictEntry<T> with a single type parameter T that extends from Pair<String,T>, where String is the first type argument (in place of S), while the type parameter T from DictEntry<T> is passed as the type argument for T of Pair<String,T>.
                """]
response = text_analytics_client.extract_key_phrases(documents)

for document in response:
    print("Key Phrases:")
    for phrase in document.key_phrases:
        print(phrase)