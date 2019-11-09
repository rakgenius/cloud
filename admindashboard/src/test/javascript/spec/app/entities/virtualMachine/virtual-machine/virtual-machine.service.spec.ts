import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { VirtualMachineService } from 'app/entities/virtualMachine/virtual-machine/virtual-machine.service';
import { IVirtualMachine, VirtualMachine } from 'app/shared/model/virtualMachine/virtual-machine.model';

describe('Service Tests', () => {
  describe('VirtualMachine Service', () => {
    let injector: TestBed;
    let service: VirtualMachineService;
    let httpMock: HttpTestingController;
    let elemDefault: IVirtualMachine;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(VirtualMachineService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new VirtualMachine(0, 'AAAAAAA', 0, 'AAAAAAA', 0, 0, 0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a VirtualMachine', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new VirtualMachine(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a VirtualMachine', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            accountid: 1,
            accountName: 'BBBBBB',
            cpu: 1,
            ram: 1,
            disk: 1,
            traffic: 1,
            template: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of VirtualMachine', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            accountid: 1,
            accountName: 'BBBBBB',
            cpu: 1,
            ram: 1,
            disk: 1,
            traffic: 1,
            template: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a VirtualMachine', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
