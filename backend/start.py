# from models import app, storage
# from models.coin import Coin
# from models.user import User
# from models.transaction import Transaction
# from models import app

# with app.app_context():
#     storage.drop_all()
#     storage.create_all()
#     coin = Coin(name="bitcoin", description="the latest transaction", price=20.32)
#     transaction = Transaction(
#         quanity=20, amount_usd=23.322, amount_ngn=23.33, coin="btc"
#     )
#     user = User(
#         first_name="John",
#         last_name="james",
#         email="redeks@gmail.com",
#         password_hash="555",
#         username="redeks",
#         bank="polaris",
#         account_name="John",
#         account_number="123456789",
#     )
#     storage.new(coin, transaction, user)
#     storage.save()
#     print(storage.all(Coin))
#     print(storage.all(Transaction))
#     print(storage.all(User))
#     storage.delete(coin)
#     storage.save()
import base64
from PIL import Image
from io import BytesIO


def get_coded_image(image):
    with open(image, "rb") as im:
        nnn = im.read()
        enco = base64.b64encode(nnn)
        # ba = base64.b64decode(enco).decode("utf-8")
        # images = Image.open(BytesIO(nnn))
        # resised = images.tobytes()
        print(nnn)
        # print(images.getdata())

        # return nnn

    with open("recieved.png", "wb") as q:
        nnnn = q.write(nnn)


print(get_coded_image("./models/img.png"))
