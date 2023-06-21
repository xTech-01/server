
import sys
import psycopg2

def main():

    dbname = 'products'
    user = 'postgres'
    password =' 1234'
    host = 'localhost'
    port = 5432

    try:
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        print(conn)
        print(type(conn))
        print(repr(conn))
    except psycopg2.Error as e:
        print("Error: Could not make connection to the Postgres database")
        print(e)
        sys.exit()

if __name__ == '__main__':

    main()

