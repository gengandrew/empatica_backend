import matplotlib.pyplot as plt
import pymysql
import sys
import gc

if len(sys.argv) < 2:
    print("Invalid number of paramters!")
    sys.exit()
else:
    sessionID = sys.argv[1]
    graphTicks = 150

def connect():
    conn = pymysql.connect(host='localhost',
                           user='root',
                           password='12345',
                           db='DEASA_Database',
                           charset='utf8')
    c = conn.cursor()
    return conn, c

def getFacialLandmarks():
    conn, c = connect()
    query = "SELECT UTC, Landmark_Number, Distance FROM FaceTable WHERE SessionID=%s;"
    c.execute(query, str(sessionID))
    res = c.fetchall()
    conn.commit()
    conn.close()
    gc.collect()
    return res

def graph(data):
    fig = plt.figure()
    ax = fig.add_subplot(1, 1, 1)
    for each in data:
        distList = each[0]
        index = 0
        for distance in distList:
            ax.scatter(distance, index, alpha=0.8, c="red", edgecolors='none', s=30)
            index = index+1

    plt.title('Facial landmarks scatter plot')
    plt.legend(loc=2)
    plt.show()

data = getFacialLandmarks()
fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)

for each in data:
    time = each[0]
    facial_number = each[1]
    distance = each[2]
    ax.scatter(distance, facial_number, alpha=0.8, c="red", edgecolors='none', s=30)

plt.title('Facial landmarks scatter plot')
plt.legend(loc=2)
plt.show()