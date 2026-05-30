import pandas as pd

from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from sklearn.metrics import confusion_matrix


df = pd.read_csv(
    "data/transactions.csv"
)

X = df[
    [
        "amount",
        "merchant_risk",
        "location_risk",
        "velocity_flag"
    ]
]

y = df["fraud"]


X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.2,

    random_state=42

)


model = RandomForestClassifier()

model.fit(
    X_train,
    y_train
)

predictions = model.predict(
    X_test
)


print(
    "Accuracy:",
    accuracy_score(y_test, predictions)
)

print(
    "Precision:",
    precision_score(y_test, predictions)
)

print(
    "Recall:",
    recall_score(y_test, predictions)
)

print(
    "Confusion Matrix:"
)

print(
    confusion_matrix(y_test, predictions)
)