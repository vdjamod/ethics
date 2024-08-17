data=[('Trip_Name', 'Ujjain Mahakal'), ('date', '2024-08-03'), ('status', 'past'), ('source', 'jm'), ('destination', 'jn'), ('destination', 'jn'), ('discription', 'jnj'), ('friends', 'jn'), ('file-upload', '')]
# print(data)
form_dic={}
form_dic['destination']=[]
for i in data:
    # print(i)
    if i[0]=="destination":
        form_dic["destination"].append(i[1])
    else:
        form_dic[i[0]]=i[1]

print(form_dic)