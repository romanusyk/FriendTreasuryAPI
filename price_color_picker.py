import argparse
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument("-p", "--price", type=float, required=True, help="Price toCreation color")
parser.add_argument("-n",  "--min", type=float, default=0., help="Min price")
parser.add_argument("-x",  "--max", type=float, default=1000., help="Max price")
args = parser.parse_args()

min_color = (0, 93, 255)
max_color = (13, 255, 137)

min_price = args.min
max_price = args.max
price = args.price

print(args)

# color = tuple(map(int, [min_color[i] + (max_color[i] - min_color[i]) * np.clip((price - min_price) / (max_price - min_price), 0, 1) for i in range(3)]))
coeff = (price - min_price) / (max_price - min_price)
color = (int(np.sin(coeff * np.pi / 2) * 255), int(np.cos(coeff * np.pi / 2) * 255), 0)

print("".join([format(a, "02x") for a in color]))
