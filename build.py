#!/usr/bin/python

from typing import List

def main(args: List) -> None:
    from time import time
    from subprocess import PIPE, DEVNULL, run

    timer = time()

    run(
        ["web-ext", "build", "--overwrite-dest"],
        stdout=DEVNULL,
        stderr=PIPE,
        universal_newlines=True
    )

    print("[BUILDER] Built in {}s".format(round(time() - timer, 3)))
    exit(1)


if __name__ == "__main__":
    from sys import argv, exit
    main(argv)