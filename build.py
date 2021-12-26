#!/usr/bin/python

from typing import List
from sys import argv
from time import time
from subprocess import PIPE, DEVNULL, run

def main(args: List) -> None:
    timer = time()

    run(
        ["web-ext", "build", "--overwrite-dest"],
        stdout=DEVNULL,
        stderr=PIPE,
        universal_newlines=True
    )

    print("[BUILDER] Built in {}s".format(round(time() - timer, 3)))


if __name__ == "__main__":
    main(argv)