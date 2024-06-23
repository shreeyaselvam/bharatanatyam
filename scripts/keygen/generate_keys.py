import sys, random, math, hashlib

class rsakey:
    bit_length = None  # the bit length
    pub_key = None  # the public key (or None if it's just a private key)
    priv_key = None  # the private key (or None if it's just a public key)
    n = None  # the modulus (n=p*q)

    def __init__(self, _l, _e, _d, _n):
        (self.bit_length, self.pub_key, self.priv_key, self.n) = (_l, _e, _d, _n)

def generate_prime(bits, k):
    count = 0
    while True:
        # generate a number, make sure it's odd
        n = random.randint(1, 2 ** (bits + 1) - 1)
        if n % 2 == 0:
            n += 1
        count += 1
        # run the Fermat primality test
        iterations = 0
        for _ in range(k):
            a = random.randint(1, n - 1)
            # pow(a,n-1,n) = a^(n-1) % n --> keep it within the range 0-n
            if pow(a, n - 1, n) != 1:  # it's composite
                break
            else:  # prime so far
                iterations += 1
        if iterations == k:
            return n

def generateKeys(bitlength):
    p = generate_prime(bitlength, 20)
    q = generate_prime(bitlength, 20)
    while abs(p - q) <= 30:  # or hasSmallPrimeFactors(p - 1, q - 1)
        p = generate_prime(bitlength, 20)
        q = generate_prime(bitlength, 20)

    n = p * q
    n_mod = (p - 1) * (q - 1)
    e = generate_prime(bitlength, 30)  # arbitrary operation in hope of getting large prime number less than n
    # while not coprime(e, n_mod):
    #     print(coprime(e, n_mod))
    #     e = generate_prime(bitlength, 20)

    d = pow(e, -1, n_mod)

    key = rsakey(bitlength, e, d, n)
    return key

keyset = generateKeys(2048)
print(keyset.pub_key)
print(" ")
print(keyset.priv_key)
print(" ")